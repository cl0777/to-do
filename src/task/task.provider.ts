import { Task } from './task.entity';

export const taskProvider = [
  {
    provide: 'TASK_REPOSITORY',
    useValue: Task,
  },
];
