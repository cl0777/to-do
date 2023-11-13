import { ApiProperty } from '@nestjs/swagger';

export class GetOneTask {
  @ApiProperty()
  taskId: string;
}
