import { User } from 'src/user/dto/user.dto';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity()
export class Friend {
  @ManyToOne(
    type => User,
    user => user.id,
    { primary: true },
  )
  user: User;

  @ManyToOne(
    type => User,
    user => user.id,
    { primary: true },
  )
  friend: User;

  @Column({ type: 'int', default: 0 })
  status: number;
}
