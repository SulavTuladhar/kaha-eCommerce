/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(
    @Body() loginUserDto: LoginUserDto, 
    @Res({passthrough: true}) response: Response
  ) {
    return this.authService.login(loginUserDto, response);
  }

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('/logout')
  logout(@Res({passthrough: true}) response: Response) {
    return this.authService.logout(response);
  }
}
 