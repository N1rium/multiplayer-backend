import { Module } from '@nestjs/common';
import { GameModeController } from './game-mode.controller';
import { GameModeService } from './game-mode.service';

@Module({
  controllers: [GameModeController],
  providers: [GameModeService]
})
export class GameModeModule {}
