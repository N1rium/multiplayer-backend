import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from 'src/user/dto/user.dto';

export enum NotificationType {
  USER_REGISTER = 'USER_REGISTER',
  UNKNOWN = 'UNKNOWN',
}

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: false })
  read: boolean;

  @Column({ type: 'jsonb' })
  data: { [key: string]: any };

  @Column({
    type: 'enum',
    enum: NotificationType,
    default: NotificationType.UNKNOWN,
  })
  type: NotificationType;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];
}
