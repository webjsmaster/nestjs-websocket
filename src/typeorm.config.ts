import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { UserEntity } from './api/users/entity/users.entity';

dotenv.config();

declare let process: { env: { [key: string]: string } };

export const options = {
  type: process.env.TYPEORM_CONNECTION as string,
  host: process.env.TYPEORM_HOST as string,
  port: parseInt(process.env.TYPEORM_PORT as string, 10) as number,
  username: process.env.TYPEORM_USERNAME as string,
  database: process.env.TYPEORM_DATABASE as string,
  password: process.env.TYPEORM_PASSWORD as string,
  migrationsRun: false,
  synchronize: true,
};
export const dataSourceConfig = {
  ...options,
  entities: [UserEntity],
  migrations: ['src/migrations/*.{ts,js}'],
  ssl: {
    rejectUnauthorized: false,
  },
  cli: {
    entitiesDir: 'src/api/**/**/',
    migrationsDir: 'src/migrations',
  },
} as DataSourceOptions;

export const typeOrmConfig = {
  ...options,
  entities: [__dirname + '/**/**/**/*.entity.{ts,js}'],
  migrations: [__dirname + './migrations/*.{ts,js}'],
  ssl: {
    rejectUnauthorized: false,
  },
  retryAttempts: 5,
} as TypeOrmModuleOptions;
