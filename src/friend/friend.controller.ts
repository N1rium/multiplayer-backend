import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Friend } from './dto/friend.dto';
import { FriendService } from './friend.service';
import { User } from 'src/common/decorator/user.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserFriendsDTO } from './dto/user-friends.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('friend')
@Controller('friend')
export class FriendController {
  constructor(private readonly service: FriendService) {}

  @Get('')
  @ApiOperation({ summary: 'Get friends of user' })
  friends(@User() user): Promise<UserFriendsDTO> {
    return this.service.friends(user.id);
  }

  @Post('/:friendId')
  @ApiOperation({ summary: 'Send a friend request' })
  create(@User() user, @Param('friendId') friendId: string): Promise<Friend> {
    return this.service.create(user.id, friendId);
  }

  @Post('/:friendId/accept')
  @ApiOperation({ summary: 'Accept a friend request' })
  accept(@User() user, @Param('friendId') friendId: string): Promise<Friend> {
    return this.service.accept(user.id, friendId);
  }

  @Delete('/:friendId/decline')
  @ApiOperation({ summary: 'Reject a friend request' })
  decline(@User() user, @Param('friendId') friendId: string): Promise<Friend> {
    return this.service.decline(friendId, user.id);
  }

  @Delete('/:friendId/cancel')
  @ApiOperation({ summary: 'Cancel a friend request' })
  cancel(@User() user, @Param('friendId') friendId: string): Promise<Friend> {
    return this.service.decline(user.id, friendId);
  }
}
