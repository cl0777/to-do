import { ApiProperty } from '@nestjs/swagger';

export class ChangeTask {
  @ApiProperty()
  taskId: string;
  @ApiProperty()
  taskName: string;
  @ApiProperty()
  taskDescription?: string | null;
}
