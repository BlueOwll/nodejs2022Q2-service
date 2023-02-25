import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';

import { FavoritesArtist } from './entities/favoriteArtist.entity';
import { FavoritesTrack } from './entities/favoriteTrack.entity';
import { FavoritesAlbum } from './entities/favoriteAlbum.entity';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [
    TypeOrmModule.forFeature([FavoritesTrack, FavoritesAlbum, FavoritesArtist]),
  ],
})
export class FavoritesModule {}
