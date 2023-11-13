import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import 'dotenv/config';
import { authsProvider } from './auth/auth.provider';
import { TaskModule } from './task/task.module';
import { taskProvider } from './task/task.provider';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    JwtModule.register({
      secret: process.env.TOKEN_SECRET_KEY,
    }),
    UserModule,
    TaskModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, ...authsProvider, ...taskProvider],
})
export class AppModule {}
