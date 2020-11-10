import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './dto/notification.dto';
import { Repository, In } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { CreateNotification } from './dto/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    private readonly userService: UserService,
  ) {}

  async notification(id: string): Promise<Notification> {
    const notification = await this.notificationRepository.findOne(id);
    if (!notification) throw new NotFoundException();
    return notification;
  }

  async notifications(ids: string[]): Promise<Notification[]> {
    const notifications = await this.notificationRepository.find({
      where: { id: In(ids) },
    });
    return notifications;
  }

  async user(userId: string): Promise<Notification[]> {
    return this.notificationRepository
      .createQueryBuilder('n')
      .innerJoin('n.users', 'u')
      .where('u.id = :userId')
      .setParameter('userId', userId)
      .getMany();
  }

  async create(data: CreateNotification): Promise<Notification> {
    const users = await this.userService.byIds(data.userIds);
    const notification = this.notificationRepository.create({
      users,
      data: data.data,
    });
    return this.notificationRepository.save(notification);
  }

  async read(ids: string[]): Promise<Notification[]> {
    let notifications = await this.notifications(ids);
    notifications = notifications.map(n => ({ ...n, read: true }));
    return this.notificationRepository.save(notifications);
  }
}
