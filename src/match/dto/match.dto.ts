import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { MatchState } from './match-state.dto';
import { MatchParticipant } from 'src/match-participant/dto/match-participant.dto';
import { ScoreEvaluator } from './score-evaluator';
import { Game } from 'src/game/dto/game.dto';

@Entity()
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'enum', enum: MatchState, default: MatchState.ACTIVE })
  state: MatchState;

  @Column({ type: 'boolean', default: false })
  ranked: boolean;

  @CreateDateColumn()
  creationDate: string;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column({ type: 'enum', enum: ScoreEvaluator, default: ScoreEvaluator.MAX })
  scoreEvaluator: ScoreEvaluator;

  @Column({ type: 'jsonb', nullable: true })
  displayValues: { [key: string]: any };

  @Column({ type: 'jsonb', nullable: true })
  gameSettings: { [key: string]: any };

  @ManyToOne(
    () => Game,
    game => game.matches,
  )
  game: Game;

  @OneToMany(
    () => MatchParticipant,
    participant => participant.match,
  )
  participants: MatchParticipant[];
}
