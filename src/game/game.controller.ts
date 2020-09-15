import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from './dto/game.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateGame } from './dto/create-game.dto';

@ApiTags('game')
@Controller('game')
export class GameController {
  constructor(private readonly service: GameService) {}

  @Get('')
  all(): Promise<Game[]> {
    return this.service.all();
  }

  @Get(':id')
  findById(@Param() params): Promise<Game> {
    return this.service.byId(params.id);
  }

  @Post('')
  create(@Body() data: CreateGame): Promise<Game> {
    return this.service.create(data);
  }
}
