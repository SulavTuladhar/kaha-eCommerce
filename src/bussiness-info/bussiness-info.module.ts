import { Module } from '@nestjs/common';
import { BussinessInfoService } from './bussiness-info.service';
import { BussinessInfoController } from './bussiness-info.controller';
import { BussinessInfo } from './entities/bussiness-info.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([BussinessInfo]), UserModule],
  controllers: [BussinessInfoController],
  providers: [BussinessInfoService, JwtStrategy, RolesGuard],
})
export class BussinessInfoModule {}
