/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateBussinessInfoDto } from './dto/create-bussiness-info.dto';
import { UpdateBussinessInfoDto } from './dto/update-bussiness-info.dto';
import { BussinessInfo } from './entities/bussiness-info.entity';

@Injectable()
export class BussinessInfoService {
  constructor(
      @InjectRepository(BussinessInfo) private bussinessRepository: Repository<BussinessInfo>,
      private userService: UserService
    ){}
  
  async create(createBussinessInfoDto: CreateBussinessInfoDto, request: Request) {
    try{
      const user = await this.userService.findUser(request);
      const createdInfo = await this.findAll(request) ;
      if(createdInfo[0]){
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
      }else{
        const bussinessInfo  = await this.bussinessRepository.create({
          panId: createBussinessInfoDto.panId,
          pickUp: createBussinessInfoDto.pickUp,
          DeliveryService: createBussinessInfoDto.DeliveryService,
          email: createBussinessInfoDto.email,
          phone: createBussinessInfoDto.phone,
          Address: createBussinessInfoDto.Address,
          user: user
        });
        const savedInfo = await this.bussinessRepository.save(bussinessInfo);
        savedInfo.user = null;
        return savedInfo;
      }
    }catch(err){
      throw err;
    }
  }

  async findAll(request: Request) {
    const user = await this.userService.findUser(request);
    const allInfos = await this.bussinessRepository
      .createQueryBuilder("info")
      .where("info.user.id= :userId", { userId: user.id })
      .getOne()
    return allInfos;
  }

  async update(updateBussinessInfoDto: UpdateBussinessInfoDto, request: Request) {
    try{
      const user = await this.userService.findUser(request);
      let info = await this.bussinessRepository
      .createQueryBuilder("info")
      .where("info.user.id= :userId", { userId: user.id })
      .getOne()

      info.panId = updateBussinessInfoDto.panId,
      info.pickUp = updateBussinessInfoDto.pickUp,
      info.DeliveryService = updateBussinessInfoDto.DeliveryService,
      info.phone = updateBussinessInfoDto.phone,
      info.Address = updateBussinessInfoDto.Address,
      info.email = updateBussinessInfoDto.email

      const savedInfo = await this.bussinessRepository.save(info)
      return savedInfo
    }catch(err){
      throw err;
    }
  }
}
