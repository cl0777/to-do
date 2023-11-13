import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Table,
  Model,
} from 'sequelize-typescript';
import { User } from 'src/auth/auth.entity';

@Table({ updatedAt: true, createdAt: false })
export class Task extends Model {
  @ApiProperty()
  @Column({ primaryKey: true })
  taskId: string;
  @ApiProperty()
  @Column({ allowNull: true })
  taskName: string;
  @ApiProperty()
  @Column({ allowNull: true })
  taskDescription: string;
  @ApiProperty()
  @Column({ allowNull: false })
  isTaskDone: boolean;
  @ApiProperty()
  @ForeignKey(() => User)
  userId: string;
  @BelongsTo(() => User, 'userId')
  users: User;
}
