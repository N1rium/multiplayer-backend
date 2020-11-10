import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from './dto/friend.dto';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [NotificationModule, TypeOrmModule.forFeature([Friend])],
  providers: [FriendService],
  controllers: [FriendController],
})
export class FriendModule {}
