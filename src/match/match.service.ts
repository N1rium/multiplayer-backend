import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Match } from './dto/match.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMatchDto } from './dto/create-match.dto';
import { MatchParticipant } from 'src/match-participant/dto/match-participant.dto';
import { UserService } from 'src/user/user.service';
import { UpdateMatchDto } from './dto/update-match.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    @InjectRepository(MatchParticipant)
    private readonly matchParticipantRepository: Repository<MatchParticipant>,
    private readonly userService: UserService,
  ) {}

  async create(data: CreateMatchDto): Promise<Match> {
    const match = this.matchRepository.create({
      ...data,
      game: { id: data.gameId },
    });
    return this.matchRepository.save(match);
  }

  async update(id: string, data: UpdateMatchDto): Promise<Match> {
    await this.matchRepository.update(id, data);
    return this.matchRepository.findOne(id);
  }

  async byId(id: string): Promise<Match> {
    const match = await this.matchRepository.findOne(id);
    if (!match) throw new NotFoundException();
    return match;
  }

  async byGame(gameId: string): Promise<Match[]> {
    return this.matchRepository.find({
      where: { game: { id: gameId } },
      relations: ['participants', 'participants.user'],
    });
  }

  async join(matchId: string, userId: string): Promise<Match> {
    const match = await this.byId(matchId);
    const user = await this.userService.byId(userId);

    const mp = this.matchParticipantRepository.create({
      match,
      user,
    });
    await this.matchParticipantRepository.save(mp);
    return match;
  }

  async reportScore(
    matchId: string,
    token: string,
    score: number,
  ): Promise<MatchParticipant> {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const { id: userId } = user;

    let mp = await this.matchParticipantRepository.findOne({
      where: { match: { id: matchId }, user: { id: userId } },
      relations: ['user', 'match'],
    });

    if (!mp) {
      mp = this.matchParticipantRepository.create({
        match: { id: matchId },
        user: { id: userId },
        scoreValue: null,
      });
    }

    if (mp.scoreValue === null || mp.scoreValue < score) {
      mp.scoreValue = score;
      await this.matchParticipantRepository.save(mp);
    }
    
    return mp;
  }

  async matchWithLeaderboard(id: string): Promise<Match> {
    return this.matchRepository
      .createQueryBuilder('match')
      .leftJoinAndSelect('match.game', 'game')
      .leftJoinAndSelect('match.participants', 'participant')
      .leftJoinAndSelect('participant.user', 'user')
      .orderBy('participant.scoreValue', 'DESC')
      .where('match.id = :id')
      .setParameter('id', id)
      .getOne();
  }
}
