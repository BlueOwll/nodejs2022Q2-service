import { Module } from '@nestjs/common';
import { UsersDbStorage } from './users-db/users-db.storage';

@Module({
  providers: [UsersDbStorage],
  exports: [UsersDbStorage],
})
export class DatabaseModule {}
