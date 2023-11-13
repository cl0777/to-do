import { ApiProperty } from '@nestjs/swagger';

export class TaskDone {
  @ApiProperty()
  taskId: string;
  @ApiProperty({ default: 'true' })
  isDone: boolean;
}
