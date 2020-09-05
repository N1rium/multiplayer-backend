import { ApiProperty } from '@nestjs/swagger';

export class CreateNotification {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  data: { [key: string]: any };

  @ApiProperty()
  userIds: string[];
}
