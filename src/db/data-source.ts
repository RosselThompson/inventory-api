import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Business } from 'src/business/entities/business.entity';
import { User } from 'src/user/entities/user.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '1433'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Business, User],
  synchronize: false,
  logging: true,
  options: { encrypt: false },
});
