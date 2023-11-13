import {
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateUser } from 'src/dto/create-user.dto';
import { LoginUser } from 'src/dto/login-user.dto';
import { User } from './auth.entity';
import * as uniq from 'uniqid';
import * as bcrypt from 'bcrypt';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY') private Users: typeof User,
    private jwtService: JwtService,
  ) {}

  async register(body: CreateUser, res: Response) {
    console.log(body);
    try {
      if (!body.password || !body.username || !body.email) {
        throw new HttpException('Fill all fields', HttpStatus.NOT_ACCEPTABLE);
      }
      const hash = await bcrypt.hash(body.password, 10);
      try {
        const newUser = this.Users.create({
          userId: uniq('user-'),
          username: body.username,
          email: body.email,
          password: hash,
        });
        const payload = {
          userId: (await newUser).userId,
        };
        const token = await this.jwtService.signAsync(payload);
        return res.status(HttpStatus.OK).json({
          token,
        });
      } catch (error) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: error.errors[0].message });
      }
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }
  async login(body: LoginUser, res) {
    console.log(body);

    try {
      if (!body.password || !body.username) {
        throw new HttpException(
          'Fill all required fields',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
      const userValue = await this.Users.findOne({
        where: { username: body.username },
        // attributes: { exclude: ['password'] },
      });
      if (!userValue) {
        throw new HttpException('Not Founded User', HttpStatus.NOT_FOUND);
      }
      const isMatched = await bcrypt.compare(body.password, userValue.password);
      if (!isMatched) {
        throw new HttpException(
          'Incorrect username or password!',
          HttpStatus.UNAUTHORIZED,
        );
      }
      const payload = {
        userId: userValue.userId,
      };
      const token = await this.jwtService.signAsync(payload);
      return res.status(HttpStatus.OK).json({ token });
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }
}
