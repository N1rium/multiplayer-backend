import { Module } from '@nestjs/common';
import { EloController } from './elo.controller';
import { EloService } from './elo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Elo } from './dto/elo.dto';

@Module({
  imports: [TypeOrmModule.forFeature([Elo])],
  controllers: [EloController],
  providers: [EloService],
})
export class EloModule {}
