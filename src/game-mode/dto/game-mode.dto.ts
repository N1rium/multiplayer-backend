import { Elo } from "src/elo/dto/elo.dto";
import { Game } from "src/game/dto/game.dto";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

@Entity()
export class GameMode {
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @OneToOne(() => Elo)
  @JoinColumn()
  elo: Elo;

  @ManyToOne(
    () => Game,
    game => game.modes,
  )
  game: Game;
}