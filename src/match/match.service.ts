import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Match } from './dto/match.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
  ) {}
}
