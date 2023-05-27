import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserService } from './user.service';

@Controller("/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() user: RegisterUserDto){
    return this.userService.create(user)
  }

  @MessagePattern({role: "user", cmd: "get"})
  getUser(phoneNumber: string){
    return this.userService.getUserByPhoneNumber(phoneNumber);
  }

  @MessagePattern({role: "user", cmd: "create"})
  createUserWithGoogle(user: any){
    return this.userService.createUserWithSocialMedia(user)
  }

  @MessagePattern({role: "token", cmd: "create"})
  createRefresToken(payload: {userId: string, token: string}){
    return this.userService.setUserRefreshToken(payload.userId, payload.token)
  }
  @MessagePattern({role: "token", cmd: "get"})
  getUserWithToken(token: string){
    return this.userService.getUserWithRefreshToken(token)
  }
}
