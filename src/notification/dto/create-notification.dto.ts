import { ApiProperty } from '@nestjs/swagger';
import { NotificationType } from './notification.dto';

export class CreateNotification {
  @ApiProperty()
  title: string;

  @ApiProperty()
  type: NotificationType;

  @ApiProperty()
  description: string;

  @ApiProperty()
  data: { [key: string]: any };

  @ApiProperty()
  userIds: string[];
}
