import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ChangePassword } from 'src/dto/change-password-user.dto';
import { ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Response, Request } from 'express';
import { User } from 'src/auth/auth.entity';
import { ErrorHandler } from 'src/dto/error-hanlder.dto';

@ApiTags('User & Functions')
@ApiSecurity('token')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @ApiResponse({
    description: 'Fill all required Fields',
    status: HttpStatus.NOT_ACCEPTABLE,
    type: ErrorHandler,
  })
  @ApiResponse({
    description: 'Wrong Current Password',
    status: HttpStatus.BAD_REQUEST,
    type: ErrorHandler,
  })
  @ApiResponse({
    description: 'Internal Server Error',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorHandler,
  })
  @ApiResponse({
    description: 'Ok',
    status: HttpStatus.OK,
    schema: {
      example: {
        status: 'Ok',
      },
    },
  })
  @Put('/changePassword')
  changePassword(
    @Body() body: ChangePassword,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    return this.userService.changePassword(body, res, req);
  }
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error',
    type: ErrorHandler,
  })
  @Get('/getUser')
  getUser(@Res() res: Response, @Req() req: Request) {
    return this.userService.getUser(res, req);
  }
}
