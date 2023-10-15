import { DataSource } from 'typeorm';
import { dataSourceConfig } from './typeorm.config';

export const AppDataSource = new DataSource(dataSourceConfig);
AppDataSource.initialize();
