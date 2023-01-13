/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// /* eslint-disable @typescript-eslint/no-unused-vars */
//  /* eslint-disable prettier/prettier */
 import { Injectable } from '@nestjs/common';
 import { Repository } from 'typeorm';
 import { UpdateUserDto } from './dto/update-user.dto';
 import { User } from './entities/user.entity';
 import { InjectRepository } from '@nestjs/typeorm';
 import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';

 @Injectable()
 export class UserService {
   constructor(
    @InjectRepository(User) private usersRepository: Repository<User>, 
    private jwtService: JwtService,
    ){  
   }

   async findUser(request: Request) {
    try{
      const cookie = request.cookies['jwt'];  
      // if(!cookie){
      //   throw new UnauthorizedException();
      // }
      const data = await this.jwtService.verifyAsync(cookie);
      
      // if(!data){
      //   throw new UnauthorizedException();
      // }
      const user = await this.usersRepository.findOneOrFail({id: data['id']});
      user.password = "";
      return user;
    }catch(err){
      throw err;
    }
  }

   async update(updateUserDto: UpdateUserDto, request: Request) {
    try{
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);
      if(!data){
        throw new UnauthorizedException();
      }
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 12);
      let user = await this.usersRepository.findOneOrFail({id: data['id']});
      user.email = updateUserDto.email,
      user.name = updateUserDto.name,
      user.password = hashedPassword
      let updatedUser = await this.usersRepository.save(user);
      return updatedUser;      
    }catch(err){
      throw err;
    }
   }

   async remove(request: Request, response: Response) {
    try{
      let user = await this.findUser(request);
      await this.usersRepository.remove(user);
      // this.authService.logout(response);
      response.clearCookie('jwt');
      return 'User Removed Successfully';
    }catch(err){
      throw err;
    }
   }
 }
