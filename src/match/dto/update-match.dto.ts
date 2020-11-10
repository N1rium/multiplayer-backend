import { ApiProperty } from '@nestjs/swagger';
import { ScoreEvaluator } from './score-evaluator';

export class UpdateMatchDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  endDate?: Date;

  @ApiProperty()
  displayValues?: { [key: string]: any };

  @ApiProperty()
  gameSettings?: { [key: string]: any };

  @ApiProperty({ enum: ScoreEvaluator, default: ScoreEvaluator.MAX })
  scoreEvaluator?: ScoreEvaluator;
}
