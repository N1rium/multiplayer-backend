import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './dto/game.dto';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private gameRepository: Repository<Game>,
  ) {}

  async all(): Promise<Game[]> {
    return this.gameRepository.find();
  }

  async byId(id: string): Promise<Game> {
    const game = await this.gameRepository.findOne(id);
    if (!game) throw new NotFoundException();
    return game;
  }
}
