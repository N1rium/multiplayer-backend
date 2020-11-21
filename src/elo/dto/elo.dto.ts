import { Entity, Column, ManyToOne, OneToOne } from 'typeorm';
import { User } from 'src/user/dto/user.dto';
import { GameMode } from 'src/game-mode/dto/game-mode.dto';

@Entity()
export class Elo {
  @Column({ type: 'integer', default: 1500 })
  value: number;

  @ManyToOne(
    () => User,
    user => user.elos,
    { primary: true },
  )
  user: User;

  @OneToOne(() => GameMode, mode => mode.elo, { primary: true })
  mode: GameMode;
}
