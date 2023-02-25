import { DataSource, DataSourceOptions } from 'typeorm';

import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import User from '../users/entities/user.entity';
import { Album } from '../albums/entities/album.entity';
import { Artist } from '../artists/entities/artist.entity';
import { FavoritesAlbum } from '../favorites/entities/favoriteAlbum.entity';
import { FavoritesArtist } from '../favorites/entities/favoriteArtist.entity';
import { FavoritesTrack } from '../favorites/entities/favoriteTrack.entity';
import { Track } from '../tracks/entities/track.entity';
import { newMigration1676935807929 } from './migrations/1676935807929-newMigration';
dotenv.config();

const dataSourceConfig = {
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
  migrations: [newMigration1676935807929],
  synchronize: false,
} as DataSourceOptions;

const dataSource = new DataSource(dataSourceConfig);

export default dataSource;
