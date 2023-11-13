import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { authsProvider } from './auth.provider';
import { AppModule } from 'src/app.module';
import 'dotenv/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.TOKEN_SECRET_KEY,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ...authsProvider],
})
export class AuthModule {}
