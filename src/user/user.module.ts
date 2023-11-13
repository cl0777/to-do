import { Module } from '@nestjs/common';
import { authsProvider } from 'src/auth/auth.provider';
import { UserService } from './user.service';

@Module({
  providers: [UserService, ...authsProvider],
})
export class UserModule {}
