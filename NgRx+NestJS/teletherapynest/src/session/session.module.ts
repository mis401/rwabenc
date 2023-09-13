import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor, Patient, Session, User } from 'src/typeorm';

@Module({
  controllers: [SessionController],
  imports: [
    TypeOrmModule.forFeature([Session, Patient, Doctor, User]),
  ],
  providers: [SessionService]
})
export class SessionModule {


}
