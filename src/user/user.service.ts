import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Like } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { User } from './dto/user.dto';
import { CreateUser } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import {
  Notification,
  NotificationType,
} from 'src/notification/dto/notification.dto';
require('dotenv').config();

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async login(body: LoginDto): Promise<any> {
    const user = await this.userByEmail(body.email);
    const { salt, password: storedPassword } = user;
    const encrypted = this.sha512(body.password, salt);

    if (storedPassword !== encrypted.passwordHash)
      throw new BadRequestException({ message: 'Wrong password' });

    const token = jwt.sign(
      {
        username: user.username,
        id: user.id,
      },
      process.env.JWT_SECRET,
    );
    return { token };
  }

  async search(value: string): Promise<User[]> {
    return this.userRepository.find({
      username: Like(`%${value}%`),
    });
  }

  async all(): Promise<User[]> {
    return this.userRepository.find();
  }

  async fromToken(token: string): Promise<User> {
    if (!token) throw new BadRequestException({ message: 'No token provided' });
    return this.byId(jwt.verify(token, process.env.JWT_SECRET).id);
  }

  async byId(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException();
    return user;
  }

  async byIds(ids: string[]): Promise<User[]> {
    return this.userRepository.find({ where: { id: In(ids) } });
  }

  async userByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email });
    if (!user) throw new NotFoundException();
    return user;
  }

  async createUser(input: CreateUser): Promise<User> {
    const {
      username = null,
      email = null,
      password = null,
      passwordRepeat = null,
    } = input;

    if (!username || !email || !password) throw new BadRequestException();

    if (password !== passwordRepeat)
      throw new BadRequestException({ message: 'Password mismatch' });

    const encrypted = this.saltHashPassword(password);
    const { salt, passwordHash } = encrypted;

    const user = this.userRepository.create({
      username,
      email,
      password: passwordHash,
      salt,
    });

    await this.userRepository.save(user);
    const notification = this.notificationRepository.create({
      users: [user],
      type: NotificationType.USER_REGISTER,
      data: {},
    });
    await this.notificationRepository.save(notification);
    return user;
  }

  /**
   * generates random string of characters i.e salt
   * @function
   * @param {number} length - Length of the random string.
   */
  genRandomString(length) {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  }

  /**
   * hash password with sha512.
   * @function
   * @param {string} password - List of required fields.
   * @param {string} salt - Data to be validated.
   */
  sha512(password, salt) {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    const value = hash.digest('hex');
    return {
      salt,
      passwordHash: value,
    };
  }

  saltHashPassword(password) {
    return this.sha512(password, this.genRandomString(16));
  }
}
