import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import * as uniq from 'uniqid';
import { CreateTask } from 'src/dto/create-task.dto';
import { Op } from 'sequelize';
import { ErrorHandler } from 'src/dto/error-hanlder.dto';
import { TaskDone } from 'src/dto/task-done.dto';

@Injectable()
export class TaskService {
  constructor(@Inject('TASK_REPOSITORY') private task: typeof Task) {}

  async getAll(query, res, req) {
    try {
      console.log(query);
      if (!query.sortBy || !query.sortType)
        throw new HttpException(
          'Insert All Query Fields!',
          HttpStatus.METHOD_NOT_ALLOWED,
        );
      const allTask = await this.task.findAll({
        where: {
          userId: req['userId'],
          taskName: {
            [Op.iLike]: `%${query.taskName || ''}%`,
          },
        },
        order: [
          [`${query.sortBy}`, query.sortType],
          ['isTaskDone', 'DESC'],
        ],
      });
      return res.status(200).json(allTask);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }
  async createTask(body: CreateTask, res, req) {
    try {
      if (!body.taskName)
        throw new HttpException(
          'Task name cannot be empty!',
          HttpStatus.NOT_ACCEPTABLE,
        );
      const newTask = await Task.create({
        taskId: uniq('task-'),
        taskName: body.taskName,
        taskDescription: body.taskDescription || null,
        isTaskDone: body.isTaskDone,
        userId: req['userId'],
      });
      return res.status(200).json({ status: 'Ok' });
    } catch (error) {
      return console.log(error);
    }
  }
  async deleteTask(id, res, req) {
    try {
      if (!id)
        throw new HttpException('Id required!', HttpStatus.NOT_ACCEPTABLE);
      try {
        const deleteUser = await this.task.destroy({ where: { taskId: id } });
        return res.status(200).json({
          status: 'Ok',
        });
      } catch (error) {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }
  async getOne(body, res, req) {
    try {
      const oneTask = await this.task
        .findOne({
          where: {
            taskId: body.taskId,
          },
        })
        .catch((err) => {
          throw new HttpException(
            'Internal Server Error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        });

      if (!oneTask) {
        throw new HttpException('Invalid Task Id', HttpStatus.BAD_REQUEST);
      }
      return res.status(HttpStatus.OK).json(oneTask);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }
  async changeTask(body, res, req) {
    try {
      const oneTask = await this.task
        .findOne({
          where: {
            taskId: body.taskId,
          },
        })
        .catch((err) => {
          throw new HttpException(
            'Internal Server Error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        });

      if (!oneTask) {
        throw new HttpException('Invalid Task Id', HttpStatus.BAD_REQUEST);
      }
      const updatedTask = await this.task.update(
        { taskName: body.taskName, taskDescription: body.taskDescription },
        { where: { taskId: body.taskId } },
      );
      return res.status(HttpStatus.OK).json({ status: 'Ok' });
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }
  async doneTask(body: TaskDone, res, req) {
    try {
      if (!body.taskId) {
        throw new HttpException('Check your taskId', HttpStatus.NOT_ACCEPTABLE);
      }
      const taskDelete = await this.task
        .update({ isTaskDone: body.isDone }, { where: { taskId: body.taskId } })
        .then((response) => {
          return res.status(HttpStatus.OK).json({ status: 'Ok' });
        })
        .catch((err) => {
          throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        });
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }
}
