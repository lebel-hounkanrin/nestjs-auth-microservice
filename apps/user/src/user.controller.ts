import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserService } from './user.service';

@Controller("/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() user: RegisterUserDto){
    return this.userService.create(user)
  }

  @Get()
  greet(){
    return "hello devs"
  }
}
