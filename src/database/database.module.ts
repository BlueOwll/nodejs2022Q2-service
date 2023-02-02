import { Module } from '@nestjs/common';
import { UsersDbService } from './users-db/users-db.service';

@Module({
  providers: [UsersDbService],
})
export class DatabaseModule {}
