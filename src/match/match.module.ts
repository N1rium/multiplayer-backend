import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './dto/match.dto';
import { MatchParticipant } from 'src/match-participant/dto/match-participant.dto';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Match, MatchParticipant]), UserModule],
  providers: [MatchService],
  controllers: [MatchController],
})
export class MatchModule {}
