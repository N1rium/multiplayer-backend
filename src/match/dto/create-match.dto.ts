import { ApiProperty } from '@nestjs/swagger';
import { ScoreEvaluator } from './score-evaluator';

export class CreateMatchDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  gameId: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  ranked: boolean;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  displayValues: { [key: string]: any };

  @ApiProperty()
  gameSettings: { [key: string]: any };

  @ApiProperty({ enum: ScoreEvaluator, default: ScoreEvaluator.MAX })
  scoreEvaluator: ScoreEvaluator;
}
