import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  Body,
  Query,
  HttpStatus,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { TaskService } from './task.service';
import { Response, Request } from 'express';
import { ApiQuery, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateTask } from 'src/dto/create-task.dto';
import { ErrorHandler } from 'src/dto/error-hanlder.dto';
import { GetOneTask } from 'src/dto/get-one.dto';
import { ChangeTask } from 'src/dto/change-task.dto';
import { Task } from './task.entity';
import { TaskDone } from 'src/dto/task-done.dto';
import { ApiCustomResponse } from 'src/filters/ApiCustomResponse';
@ApiTags('Tasks and Functions')
@ApiSecurity('token')
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @ApiCustomResponse([
    HttpStatus.INTERNAL_SERVER_ERROR,
    HttpStatus.METHOD_NOT_ALLOWED,
    HttpStatus.OK,
  ])
  @UseGuards(AuthGuard)
  @ApiQuery({
    name: 'sortType',
    required: true,
    enum: ['ASC', 'DESC'],
  })
  @ApiQuery({
    name: 'sortBy',
    required: true,
    enum: ['updatedAt', 'taskName'],
  })
  @ApiQuery({ name: 'taskName', required: false })
  @Get('getAll')
  getTasks(@Query() query, @Res() res: Response, @Req() req: Request) {
    return this.taskService.getAll(query, res, req);
  }

  @ApiCustomResponse([HttpStatus.OK, HttpStatus.NOT_ACCEPTABLE])
  @UseGuards(AuthGuard)
  @Post('createTask')
  createTask(
    @Body() body: CreateTask,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    return this.taskService.createTask(body, res, req);
  }
  @ApiCustomResponse([
    HttpStatus.NOT_ACCEPTABLE,
    HttpStatus.INTERNAL_SERVER_ERROR,
  ])
  @UseGuards(AuthGuard)
  @Delete('/deleteTask/:id')
  deleteTask(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    return this.taskService.deleteTask(id, res, req);
  }
  @ApiCustomResponse([
    HttpStatus.INTERNAL_SERVER_ERROR,
    HttpStatus.BAD_REQUEST,
    HttpStatus.OK,
  ])
  @UseGuards(AuthGuard)
  @Post('getOne')
  getOne(@Body() body: GetOneTask, @Res() res: Response, @Req() req: Request) {
    return this.taskService.getOne(body, res, req);
  }
  @ApiCustomResponse([HttpStatus.INTERNAL_SERVER_ERROR, HttpStatus.BAD_REQUEST])
  @UseGuards(AuthGuard)
  @Put('changeTask')
  changeTask(
    @Body() body: ChangeTask,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    return this.taskService.changeTask(body, res, req);
  }
  @ApiCustomResponse([
    HttpStatus.INTERNAL_SERVER_ERROR,
    HttpStatus.NOT_ACCEPTABLE,
    HttpStatus.OK,
  ])
  @UseGuards(AuthGuard)
  @Put('done')
  doneTask(@Body() body: TaskDone, @Res() res: Response, @Req() req: Request) {
    return this.taskService.doneTask(body, res, req);
  }
}
