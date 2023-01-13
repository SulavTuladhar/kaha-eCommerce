/* eslint-disable prettier/prettier */
 import { Controller, Get, Body, Patch, Delete, UseGuards, Res, Req } from '@nestjs/common';
 import { UserService } from './user.service';
 import { UpdateUserDto } from './dto/update-user.dto';
import {Request, Response} from 'express';
import { JwtAuthGaurd } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from './entities/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
 @Controller('user')
 @Roles(Role.USER)
 @UseGuards(JwtAuthGaurd, RolesGuard)
 export class UserController {
   constructor(private readonly userService: UserService) { }
   
   @Get()
   user(@Req() request: Request) {
    return this.userService.findUser(request);
   }
    
  @Patch()
    update(@Body() updateUserDto: UpdateUserDto, @Req() request: Request) {
     return this.userService.update(updateUserDto, request);
  }

   @Delete()
     remove(@Req() request: Request, @Res({passthrough: true}) response: Response) {
     return this.userService.remove(request, response);
  }
 }

