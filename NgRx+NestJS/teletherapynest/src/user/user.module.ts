import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor, Patient, User } from 'src/typeorm';

@Module({
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([Patient, Doctor])],
})
export class UserModule {}
