import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from './dto/game.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateGame } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@ApiTags('game')
@Controller('game')
export class GameController {
  constructor(private readonly service: GameService) {}

  @Get()
  all(): Promise<Game[]> {
    return this.service.all();
  }

  @Get(':id')
  findById(@Param('id') id): Promise<Game> {
    return this.service.byId(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() data: UpdateGameDto): Promise<Game> {
    return this.service.update(id, data);
  }

  @Post()
  create(@Body() data: CreateGame): Promise<Game> {
    return this.service.create(data);
  }
}
