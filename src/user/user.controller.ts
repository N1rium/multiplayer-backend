import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './dto/user.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CreateUser } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Token } from 'src/common/decorator/token.decorator';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('')
  @ApiOperation({ summary: 'Get user from token' })
  @ApiBearerAuth()
  self(@Token() token): Promise<User> {
    return this.service.fromToken(token);
  }

  @Get('/search/:value')
  @ApiOperation({ summary: 'Search for users by username' })
  search(@Param('value') value: string): Promise<User[]> {
    return this.service.search(value);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  findById(@Param('id') id: string): Promise<User> {
    return this.service.byId(id);
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Get user by email' })
  findByEmail(@Param() params): Promise<User> {
    return this.service.userByEmail(params.email);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  create(@Body() payload: CreateUser): Promise<User> {
    return this.service.createUser(payload);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Sign in' })
  login(@Body() payload: LoginDto): Promise<any> {
    return this.service.login(payload);
  }

  @Post('/byIds')
  @ApiOperation({ summary: 'Get users from list of ids' })
  findByIds(@Body() ids: string[]): Promise<User[]> {
    return this.service.byIds(ids);
  }
}
