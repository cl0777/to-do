import { ApiProperty } from '@nestjs/swagger';

export class ChangePassword {
  @ApiProperty()
  currentPassword: string;

  @ApiProperty()
  newPassword: string;
}
