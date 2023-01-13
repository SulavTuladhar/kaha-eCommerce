/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGaurd } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/user/entities/role.enum';
import { BussinessInfoService } from './bussiness-info.service';
import { CreateBussinessInfoDto } from './dto/create-bussiness-info.dto';
import { UpdateBussinessInfoDto } from './dto/update-bussiness-info.dto';

@ApiTags('bussiness-info')
@Controller('bussiness-info')
@Roles(Role.USER)
@UseGuards(JwtAuthGaurd, RolesGuard)
export class BussinessInfoController {
  constructor(private readonly bussinessInfoService: BussinessInfoService) {}

  @Post()
  create(@Body() createBussinessInfoDto: CreateBussinessInfoDto, @Req() request: Request) {
    return this.bussinessInfoService.create(createBussinessInfoDto, request);
  }

  @Get()
  findAll(@Req() request: Request) {
    return this.bussinessInfoService.findAll(request);
  }

  @Patch()
  update(@Body() updateBussinessInfoDto: UpdateBussinessInfoDto, @Req() request: Request ) {
    return this.bussinessInfoService.update(updateBussinessInfoDto, request);
  }
}
