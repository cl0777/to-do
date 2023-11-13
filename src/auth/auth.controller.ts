import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateUser } from 'src/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUser } from 'src/dto/login-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request (Depends on Sequelize error)',
    schema: {
      example: {
        message: 'string',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_ACCEPTABLE,
    description: 'Bad Request',
    schema: {
      example: {
        response: 'Please, fill all required fields!',
        status: HttpStatus.NOT_ACCEPTABLE,
        message: 'Please, fill all required fields!',
        name: 'HttpException',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Ok',
    schema: {
      example: {
        token: 'string',
      },
    },
  })
  @Post('register')
  register(@Body() body: CreateUser, @Res() res: Response) {
    return this.AuthService.register(body, res);
  }

  //---------------------------------------
  @ApiResponse({
    status: HttpStatus.NOT_ACCEPTABLE,
    description: 'Fill all fields',
    schema: {
      example: {
        response: 'Fill all fields',
        status: HttpStatus.NOT_ACCEPTABLE,
        message: 'Fill all fields',
        name: 'HttpException',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found',
    schema: {
      example: {
        response: 'Not Founded User!',
        status: HttpStatus.NOT_FOUND,
        message: 'Not Founded User!',
        name: 'HttpException',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Incorrect username or password!',
    schema: {
      example: {
        response: 'Incorrect username or password!',
        status: HttpStatus.UNAUTHORIZED,
        message: 'Incorrect username or password!',
        name: 'HttpException',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Ok',
    schema: {
      example: {
        token: 'string',
      },
    },
  })
  @Post('login')
  login(@Body() body: LoginUser, @Res() res: Response) {
    return this.AuthService.login(body, res);
  }
}
