import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post()
  getUser(@Body() user: {phoneNumber: string, password: string}){
    return this.authService.validateUser(user.phoneNumber, user.password)
  }

  @UseGuards(AuthGuard("jwt"))
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
