import { ApiProperty } from '@nestjs/swagger';

export class CreateTask {
  @ApiProperty()
  taskName: string;
  @ApiProperty()
  taskDescription?: string | null;
  @ApiProperty({ default: 'false' })
  isTaskDone: boolean;
}
