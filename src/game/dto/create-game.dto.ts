import { ApiProperty } from '@nestjs/swagger';

export class CreateGame {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
