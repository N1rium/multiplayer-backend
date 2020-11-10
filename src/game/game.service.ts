import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './dto/game.dto';
import { Repository } from 'typeorm';
import { CreateGame } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private gameRepository: Repository<Game>,
  ) {}

  async create(data: CreateGame): Promise<Game> {
    return this.gameRepository.save(data);
  }

  async all(): Promise<Game[]> {
    return this.gameRepository.find();
  }

  async update(id: string, data: UpdateGameDto): Promise<Game> {
    await this.gameRepository.update(id, data);
    return this.gameRepository.findOne(id);
  }

  async byId(id: string): Promise<Game> {
    const game = await this.gameRepository.findOne(id);
    if (!game) throw new NotFoundException();
    return game;
  }
}
