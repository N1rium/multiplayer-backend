import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { Match } from './dto/match.dto';
import { ApiTags } from '@nestjs/swagger';
import { MatchParticipant } from 'src/match-participant/dto/match-participant.dto';
import { ReportScore } from './dto/report-score.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { Token } from 'src/common/decorator/token.decorator';

@ApiTags('match')
@Controller('match')
export class MatchController {
  constructor(private readonly service: MatchService) {}

  @Get('/game/:gameId')
  byGame(@Param('gameId') gameId: string): Promise<Match[]> {
    return this.service.byGame(gameId);
  }

  @Get('/:id/full')
  full(@Param('id') id: string): Promise<Match> {
    return this.service.matchWithLeaderboard(id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateMatchDto,
  ): Promise<Match> {
    return this.service.update(id, data);
  }

  @Post()
  create(@Body() body: CreateMatchDto): Promise<Match> {
    return this.service.create(body);
  }

  @UseGuards(AuthGuard)
  @Post('/:id/reportScore')
  reportScore(
    @Param('id') id: string,
    @Token() token: string,
    @Body() body: ReportScore,
  ): Promise<MatchParticipant> {
    return this.service.reportScore(id, token, body.scoreValue);
  }

  @Post('/:id/join')
  join(@Param('id') id: string): Promise<Match> {
    return this.service.join(id, '2');
  }
}
