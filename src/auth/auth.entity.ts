import { ApiProperty } from '@nestjs/swagger';
import { DataTypes } from 'sequelize';
import { Table, Column, Model, IsEmail, HasMany } from 'sequelize-typescript';
import { Task } from 'src/task/task.entity';

@Table({ createdAt: false, updatedAt: false })
export class User extends Model {
  @ApiProperty()
  @Column({ primaryKey: true })
  userId: string;
  @ApiProperty()
  @Column({
    unique: true,
  })
  username: string;
  @ApiProperty()
  @IsEmail
  @Column({
    unique: true,
  })
  email: string;
  @Column
  password: string;

  @ApiProperty()
  @HasMany(() => Task)
  tasks: Task[];
}
