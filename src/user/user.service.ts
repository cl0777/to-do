import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/auth/auth.entity';
import { ChangePassword } from 'src/dto/change-password-user.dto';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { Task } from 'src/task/task.entity';

@Injectable()
export class UserService {
  constructor(@Inject('USERS_REPOSITORY') private Users: typeof User) {}

  async changePassword(body: ChangePassword, res: Response, req: any) {
    try {
      if (!body.currentPassword || !body.newPassword) {
        throw new HttpException(
          'Fill all required fields!',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
      const currentUser = await this.Users.findOne({
        where: { userId: req.userId },
      });

      const isMatch = await bcrypt.compare(
        body.currentPassword,
        currentUser.password,
      );
      if (!isMatch)
        throw new HttpException(
          'Wrong Current Password',
          HttpStatus.BAD_REQUEST,
        );
      try {
        var changepUser = await currentUser.update(
          { password: bcrypt.hashSync(body.newPassword, 10) },
          { where: { userId: req['userId'] } },
        );
      } catch (error) {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      await changepUser.save();

      return res.status(200).json({ status: 'Ok' });
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  async getUser(res, req) {
    try {
      const getUserValue = await this.Users.findOne({
        where: { userId: req['userId'] },
        include: [Task],
        attributes: { exclude: ['password'] },
      });
      return res.status(200).json(getUserValue);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }
}
