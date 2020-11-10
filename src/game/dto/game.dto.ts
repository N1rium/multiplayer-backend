import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Match } from 'src/match/dto/match.dto';

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
}
