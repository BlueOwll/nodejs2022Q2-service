import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
// import { DatabaseModule } from 'src/database/database.module';

import User from './entities/user.entity';
import { LoggingModule } from 'src/logging/logging.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User]), LoggingModule],
})
export class UsersModule {}
