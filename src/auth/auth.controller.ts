import {
  Controller,
  Post,
  Body,
  HttpCode,
  ForbiddenException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Public } from '../guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(201)
  async signup(@Body() signupAuthDto: SignupAuthDto) {
    return this.authService.signup(signupAuthDto);
  }

  @Public()
  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    const loggedUser = await this.authService.login(loginAuthDto);
    if (loggedUser) return loggedUser;
    throw new ForbiddenException('Login or password is incorrect');
  }
}
