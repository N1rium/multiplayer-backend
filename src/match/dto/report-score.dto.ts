import { ApiProperty } from '@nestjs/swagger';

export class ReportScore {
  @ApiProperty()
  scoreValue: number;

  @ApiProperty()
  scoreString: string;
}
