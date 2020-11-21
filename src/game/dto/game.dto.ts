import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Match } from 'src/match/dto/match.dto';
import { GameMode } from 'src/game-mode/dto/game-mode.dto';

@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'jsonb', nullable: true })
  displayValues: { [key: string]: any };

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @OneToMany(
    () => Match,
    match => match.game,
  )
  matches: Match[];

  @OneToMany(
    () => GameMode,
    mode => mode.game,
  )
  modes: GameMode[];
}
