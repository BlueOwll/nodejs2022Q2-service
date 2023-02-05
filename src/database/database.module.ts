import { Module } from '@nestjs/common';
import { TracksDbStorage } from './users-db/tracks-db.storage';
import { UsersDbStorage } from './users-db/users-db.storage';

@Module({
  providers: [UsersDbStorage, TracksDbStorage],
  exports: [UsersDbStorage, TracksDbStorage],
})
export class DatabaseModule {}
