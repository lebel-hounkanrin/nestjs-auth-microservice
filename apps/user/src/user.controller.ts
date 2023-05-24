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
    console.log("got user", phoneNumber)
    return this.userService.getUserByPhoneNumber(phoneNumber);
  }
}
