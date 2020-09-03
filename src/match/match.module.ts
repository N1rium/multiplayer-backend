import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './dto/match.dto';

@Module({
  imports: [TypeOrmModule.forFeature([Match])],
  providers: [MatchService],
  controllers: [MatchController],
})
export class MatchModule {}
