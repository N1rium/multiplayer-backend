import { ApiProperty } from '@nestjs/swagger';
import { Friend } from './friend.dto';

export class UserFriendsDTO {
  friends: Friend[];
  pending: Friend[];
  received: Friend[];
}
