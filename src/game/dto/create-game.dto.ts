import { ApiProperty } from '@nestjs/swagger';

export class CreateGame {
  @ApiProperty()
  name: string;

  @ApiProperty()
  displayValues: { [key: string]: any };
}
