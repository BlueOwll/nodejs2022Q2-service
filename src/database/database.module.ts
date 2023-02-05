import { Module } from '@nestjs/common';
import { AlbumsDbStorage } from './users-db/albums-db.storage';
import { ArtistsDbStorage } from './users-db/artists-db.storage';
import { TracksDbStorage } from './users-db/tracks-db.storage';
import { UsersDbStorage } from './users-db/users-db.storage';

@Module({
  providers: [
    UsersDbStorage,
    TracksDbStorage,
    ArtistsDbStorage,
    AlbumsDbStorage,
  ],
  exports: [UsersDbStorage, TracksDbStorage, ArtistsDbStorage, AlbumsDbStorage],
})
export class DatabaseModule {}
