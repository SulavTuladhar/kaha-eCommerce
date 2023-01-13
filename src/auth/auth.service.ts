/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import {Response} from 'express'
@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>, private jwtService: JwtService){}

  async login(loginUserDto: LoginUserDto, response: Response) {
    try{
      let user = await this.usersRepository.findOne({email: loginUserDto.email});
      if(!user){
        throw new BadRequestException('Invalid Credentials')
      }
      let password = await bcrypt.compare(loginUserDto.password, user.password);
      if(!password){
        throw new BadRequestException('Invalid Credentials')
      }

      const jwt = await this.jwtService.signAsync({id: user.id, role: user.role});
      response.cookie('jwt', jwt, {httpOnly: true});
      return {
        message: 'Successfully LoggedIn',
        status: 200
      }
    }catch(err){
      throw err;
    }
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
    let newUser = this.usersRepository.create({
    email : createUserDto.email,
    name : createUserDto.name,
    password : hashedPassword 
    })
    let user = await this.usersRepository.save(newUser);
    user.password = "";
    return user;
  }

  logout(response: Response){
    response.clearCookie('jwt');
    return 'logged out';
  }
}
