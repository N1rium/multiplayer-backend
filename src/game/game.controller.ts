import { Controller, Get, Param } from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from './dto/game.dto';

@Controller('game')
export class GameController {
  constructor(private readonly service: GameService) {}

  @Get('')
  async all(): Promise<Game[]> {
    return this.service.all();
  }

  @Get(':id')
  async findById(@Param() params): Promise<Game> {
    return this.service.byId(params.id);
  }
}
