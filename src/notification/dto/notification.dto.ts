import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from 'src/user/dto/user.dto';
import { CreateNotification } from './create-notification.dto';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'boolean', default: false })
  read: boolean;

  @Column({ type: 'jsonb' })
  data: { [key: string]: any };

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  static build(source: CreateNotification): Notification {
    const notification = new Notification();
    notification.title = source.title;
    notification.description = source.description;
    notification.data = source.data;
    return notification;
  }
}
