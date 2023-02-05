import { Module } from '@nestjs/common';
import { ArtistsDbStorage } from './users-db/artists-db.storage';
import { TracksDbStorage } from './users-db/tracks-db.storage';
import { UsersDbStorage } from './users-db/users-db.storage';

@Module({
  providers: [UsersDbStorage, TracksDbStorage, ArtistsDbStorage],
  exports: [UsersDbStorage, TracksDbStorage, ArtistsDbStorage],
})
export class DatabaseModule {}
