import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { taskProvider } from './task.provider';
import { AuthModule } from 'src/auth/auth.module';
import { AppModule } from 'src/app.module';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.TOKEN_SECRET_KEY,
    }),
  ],
  controllers: [TaskController],
  providers: [TaskService, ...taskProvider],
})
export class TaskModule {}
