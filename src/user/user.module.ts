/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt/dist';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User]) ,JwtModule.register({
    secret: '[];.,/;23122',
    signOptions: {expiresIn: '5d'},
  })],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, RolesGuard],
  exports: [UserService]
})
export class UserModule {}
