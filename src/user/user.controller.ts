import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateUser } from './dto/create-user.dto';

@ApiTags('user')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('')
  all(): Promise<User[]> {
    return this.service.all();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<User> {
    return this.service.byId(id);
  }

  @Get('email/:email')
  findByEmail(@Param() params): Promise<User> {
    return this.service.userByEmail(params.email);
  }

  @Post()
  create(@Body() payload: CreateUser): Promise<User> {
    return this.service.createUser(payload);
  }
}
