import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Elo } from 'src/elo/dto/elo.dto';
import { MatchParticipant } from 'src/match-participant/dto/match-participant.dto';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column('varchar', { length: 50 })
  username: string;

  @Exclude()
  @Column('varchar', { length: 50, unique: true })
  email: string;

  @Exclude()
  @Column('varchar', { length: 50 })
  salt: string;

  @Exclude()
  @Column('varchar')
  password: string;

  @OneToMany(
    () => Elo,
    elo => elo.user,
  )
  elos: Elo[];

  @OneToMany(
    () => MatchParticipant,
    participants => participants.user,
  )
  participants: MatchParticipant[];
}
