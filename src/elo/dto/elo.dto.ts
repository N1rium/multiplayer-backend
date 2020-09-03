import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from 'src/user/dto/user.dto';
import { Game } from 'src/game/dto/game.dto';

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

  @ManyToOne(() => Game, { primary: true })
  game: Game;
}
