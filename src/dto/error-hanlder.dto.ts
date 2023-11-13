import { ApiProperty } from '@nestjs/swagger';

export class ErrorHandler {
  @ApiProperty()
  response: string;
  @ApiProperty()
  status: number;
  @ApiProperty()
  message: string;
  @ApiProperty({ default: 'HttpException' })
  name: string;
}
