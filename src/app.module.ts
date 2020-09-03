import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/dto/user.dto';
import { GameModule } from './game/game.module';
import { MatchModule } from './match/match.module';
import { EloModule } from './elo/elo.module';
import { Game } from './game/dto/game.dto';
import { Match } from './match/dto/match.dto';
import { Elo } from './elo/dto/elo.dto';
import { MatchParticipantModule } from './match-participant/match-participant.module';
import { MatchParticipant } from './match-participant/dto/match-participant.dto';
require('dotenv').config();

@Module({
  imports: [
    UserModule,
    GameModule,
    MatchModule,
    EloModule,
    MatchParticipantModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      extra: { ssl: { rejectUnauthorized: false } },
      entities: [User, Game, Match, MatchParticipant, Elo],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
