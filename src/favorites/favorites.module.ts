import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [DatabaseModule],
})
export class FavoritesModule {}
