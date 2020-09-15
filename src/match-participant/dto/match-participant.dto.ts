import { Entity, ManyToOne, Column } from 'typeorm';
import { User } from 'src/user/dto/user.dto';
import { Match } from 'src/match/dto/match.dto';

@Entity()
export class MatchParticipant {
  @ManyToOne(
    () => User,
    user => user.participants,
    { primary: true },
  )
  user: User;

  @ManyToOne(
    () => Match,
    match => match.participants,
    { primary: true },
  )
  match: Match;

  @Column({ type: 'integer', default: 0 })
  score: number;

  @Column({ type: 'integer', default: 0 })
  eloChange: number;
}
