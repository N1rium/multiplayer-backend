import { Module } from '@nestjs/common';
import { MatchParticipantService } from './match-participant.service';
import { MatchParticipantController } from './match-participant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchParticipant } from './dto/match-participant.dto';

@Module({
  imports: [TypeOrmModule.forFeature([MatchParticipant])],
  providers: [MatchParticipantService],
  controllers: [MatchParticipantController],
})
export class MatchParticipantModule {}
