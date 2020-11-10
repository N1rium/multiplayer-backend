import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './dto/user.dto';
import { Notification } from 'src/notification/dto/notification.dto';

@Module({
  imports: [TypeOrmModule.forFeature([User, Notification])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
