import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject("USER_CLIENT") private client: ClientProxy,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }


  async validateUser(phoneNumber: string, password: string): Promise<any> {
    try{
      return new Promise((resolve, reject) => {
        this.client.send({ role: "user", cmd: "get" }, phoneNumber ).subscribe(user => {
          if(user && compareSync(password, user.password)){
            const {password, ...result} = user;
            console.log("AuthService validateUser", result)
            resolve(result);
          } else {resolve(null)}
        })
      })
    } catch (e) {
        Logger.error(e);
        return null
    }
  }

  
  async login(user: any) {
    const payload = { username: user.phoneNumber, sub: user.id };
    return {
      userId: user.id,
      access_token: this.getJwtAccessToken(user.id),
      refres_token: this.getJwtRefreshToken(user.id),
    };
  }

  getJwtAccessToken(userId: string){
    const payload = {userId};
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get("JWT_ACCESS_SECRET"),
      expiresIn: this.configService.get("JWT_ACCESS_TOKEN_EXPIRATION_TIME")
      //expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}h`
    });
    return token
  }

  getJwtRefreshToken(userId: string){
    const payload = {userId};
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get("JWT_ACCESS_SECRET"),
      expiresIn: this.configService.get("JWT_REFRESH_TOKEN_EXPIRATION_TIME")
    });
    return token
  }

  refreshTokens(token: string){
    const user = {id: ""};
    if(!user){
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }
    const accessToken = this.getJwtAccessToken(user.id);
    return {userId: user.id, accessToken, refreshToken: token}
  }
  
  async findUserByFacebookIdOrEmail(id: string, email: string): Promise<any>{
    return new Promise((resolve, reject) => {
      this.client.send({role: "user", cmd: "get"}, {id, email}).subscribe(
        user => resolve(user)
      )
    })
  }

  async getOrCrateUser(profile: any): Promise<any>{
    this.client.send({ role: "user", cmd: "create" }, profile ).subscribe(
      //res => console.log(res)
    )
  }
}
