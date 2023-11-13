import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/auth/auth.entity';
import { Task } from 'src/task/task.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'root',
        database: 'todo',
        logging: false,
      });
      sequelize.addModels([User, Task]);
      await sequelize.sync({ alter: true });
      return sequelize;
    },
  },
];
