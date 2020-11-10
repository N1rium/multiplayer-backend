import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/dto/user.dto';
import { Repository } from 'typeorm';
import { Friend } from './dto/friend.dto';
import { UserFriendsDTO } from './dto/user-friends.dto';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(Friend)
    private readonly repository: Repository<Friend>,
  ) {}

  async friends(userId: string): Promise<UserFriendsDTO> {
    const friends = await this.repository.find({
      relations: ['user', 'friend'],
      where: [{ user: { id: userId } }, { friend: { id: userId } }],
    });

    return {
      friends: friends.filter(f => f.status === 1),
      pending: friends.filter(f => f.user.id === userId && f.status === 0),
      received: friends.filter(f => f.friend.id === userId && f.status === 0),
    };
  }

  async create(userId: string, friendId: string): Promise<Friend> {
    if (userId === friendId) {
      throw new BadRequestException({
        message: 'You cannot add yourself as a friend!',
      });
    }
    const user = new User();
    user.id = userId;
    const friend = new User();
    friend.id = friendId;
    return this.repository.save({
      user,
      friend,
    });
  }

  async accept(userId: string, friendId: string): Promise<Friend> {
    const friend = await this.repository.findOne({
      where: { user: { id: userId }, friend: { id: friendId } },
    });
    friend.status = 1;
    return this.repository.save(friend);
  }

  async decline(userId: string, friendId: string): Promise<any> {
    return this.repository.delete({
      user: { id: userId },
      friend: { id: friendId },
    });
  }
}
