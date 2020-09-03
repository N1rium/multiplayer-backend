import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Match } from './dto/match.dto';

@Injectable()
export class MatchService {
  constructor(private readonly matchRepository: Repository<Match>) {}
}
