import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { MatchState } from './match-state.dto';
import { MatchParticipant } from 'src/match-participant/dto/match-participant.dto';

@Entity()
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'enum', enum: MatchState, default: MatchState.ACTIVE })
  state: MatchState;

  @Column({ type: 'boolean', default: false })
  ranked: boolean;

  @Column({ type: 'integer', default: 2 })
  minParticipants: number;

  @Column({ type: 'integer', default: 2 })
  maxParticipants: number;

  @CreateDateColumn()
  creationDate: string;

  @OneToMany(
    () => MatchParticipant,
    participant => participant.match,
  )
  participants: MatchParticipant[];
}
