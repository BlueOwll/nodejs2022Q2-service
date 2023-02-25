import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import User from 'src/users/entities/user.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Album } from 'src/albums/entities/album.entity';
import { FavoritesArtist } from 'src/favorites/entities/favoriteArtist.entity';
import { FavoritesTrack } from 'src/favorites/entities/favoriteTrack.entity';
import { FavoritesAlbum } from 'src/favorites/entities/favoriteAlbum.entity';

export const PORT = parseInt(process.env.PORT, 10) || 4000;

export const saltRound = parseInt(process.env.CRYPT_SALT) || 10;

export const jwtSecret = process.env.JWT_SECRET_KEY;
export const jwtSecretRefresh = process.env.JWT_SECRET_REFRESH_KEY;
export const tokenExpireTime = process.env.TOKEN_EXPIRE_TIME;
export const refreshTokenExpireTime = process.env.TOKEN_REFRESH_EXPIRE_TIME;

export const databaseConfig = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [
    User,
    Track,
    Artist,
    Album,
    FavoritesTrack,
    FavoritesAlbum,
    FavoritesArtist,
  ],
  subscribers: [],
  migrations: [],
  synchronize: true,
} as TypeOrmModuleOptions;
