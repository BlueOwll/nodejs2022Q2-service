import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import { User } from 'src/users/entities/user.entity';
import { Track } from 'src/tracks/entities/track.entity';

export const PORT = parseInt(process.env.PORT, 10) || 4000;

export const databaseConfig = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, Track],
  subscribers: [],
  migrations: [],
  synchronize: true,
} as TypeOrmModuleOptions;
