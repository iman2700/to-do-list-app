import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
 
import { JwtAuthGuard } from '../config/jwt-auth.guard';
import {LocalAuthGuard} from "../config/local-auth.guard";
import {User} from "../schemas/user.schema";

@Controller('auth')

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body('username') username: string, @Body('password') password: string) {
    return this.authService.signup(username, password);
  }

  
  @Post('login')
  async login(@Body('username') username: string, @Body('password') password: string) {
    return this.authService.login(username,password);
  }
}
