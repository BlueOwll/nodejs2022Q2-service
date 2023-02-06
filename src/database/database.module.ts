import { Module } from '@nestjs/common';
import { AlbumsDbStorage } from './storages/albums-db.storage';
import { ArtistsDbStorage } from './storages/artists-db.storage';
import { FavoritesDbStorage } from './storages/favorites-db.storage';
import { TracksDbStorage } from './storages/tracks-db.storage';
import { UsersDbStorage } from './storages/users-db.storage';

@Module({
  providers: [
    UsersDbStorage,
    TracksDbStorage,
    ArtistsDbStorage,
    AlbumsDbStorage,
    FavoritesDbStorage,
  ],
  exports: [
    UsersDbStorage,
    TracksDbStorage,
    ArtistsDbStorage,
    AlbumsDbStorage,
    FavoritesDbStorage,
  ],
})
export class DatabaseModule {}
