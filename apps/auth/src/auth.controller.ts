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

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<void> {

  }

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginCallback(@Req() req): Promise<void> {
    // Gestion de la réponse de Facebook après la connexion réussie
    // Vous pouvez extraire les informations d'identification de l'utilisateur à partir de req.user
    // Effectuez des actions supplémentaires, telles que la création d'un jeton d'authentification, la redirection vers une page, etc.
  }
}
