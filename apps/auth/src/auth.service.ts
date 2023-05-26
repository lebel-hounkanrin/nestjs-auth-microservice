import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject("USER_CLIENT") private client: ClientProxy,
    private jwtService: JwtService
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
    console.log("AuthService login", payload)
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findUserByFacebookIdOrEmail(id: string, email: string): Promise<any>{
    return new Promise((resolve, reject) => {
      this.client.send({role: "user", cmd: "get"}, {id, email}).subscribe(
        user => resolve(user)
      )
    })
  }

  async createFacebookUser(id:string, email: string, displayName: string): Promise<any>{

  }
}
