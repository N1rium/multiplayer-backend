import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ApiTags } from '@nestjs/swagger';
import { Notification } from './dto/notification.dto';
import { CreateNotification } from './dto/create-notification.dto';

@ApiTags('notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly service: NotificationService) {}

  @Get('/user/:id')
  userNotifications(@Param('id') id: string): Promise<Notification[]> {
    return this.service.user(id);
  }

  @Post('')
  createNotification(@Body() data: CreateNotification): Promise<Notification> {
    return this.service.create(data);
  }

  @Post('/read')
  read(@Body() data: string[]): Promise<Notification[]> {
    return this.service.read(data);
  }
}
