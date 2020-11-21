import { Module, ClassSerializerInterceptor } from '@nestjs/common';
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
import { NotificationModule } from './notification/notification.module';
import { Notification } from './notification/dto/notification.dto';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { FriendModule } from './friend/friend.module';
import { Friend } from './friend/dto/friend.dto';
import { GameModeModule } from './game-mode/game-mode.module';
require('dotenv').config();

@Module({
  imports: [
    UserModule,
    GameModule,
    MatchModule,
    EloModule,
    MatchParticipantModule,
    NotificationModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      extra: { ssl: { rejectUnauthorized: false } },
      entities: [
        User,
        Friend,
        Game,
        Match,
        MatchParticipant,
        Elo,
        Notification,
      ],
      synchronize: true,
      autoLoadEntities: true,
    }),
    FriendModule,
    GameModeModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
