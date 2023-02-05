import { Injectable } from '@nestjs/common';
import { AlbumsDbStorage } from 'src/database/storages/albums-db.storage';
import { ArtistsDbStorage } from 'src/database/storages/artists-db.storage';
import { FavoritesDbStorage } from 'src/database/storages/favorites-db.storage';
import { TracksDbStorage } from 'src/database/storages/tracks-db.storage';
import { MessageFavoritesDto } from './dto/message-favorite.dto';
import { OutputFavoriteDto } from './dto/output-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesDbStorage: FavoritesDbStorage,
    private readonly tracksDbStorage: TracksDbStorage,
    private readonly albumsDbStorage: AlbumsDbStorage,
    private readonly artistsDbStorage: ArtistsDbStorage,
  ) {}

  async findAll() {
    const result = new OutputFavoriteDto();
    const favorites = await this.favoritesDbStorage.getAll();

    result.tracks = await Promise.all(
      favorites.tracks.map(
        async (id) => await this.tracksDbStorage.findOne(id),
      ),
    );
    result.artists = await Promise.all(
      favorites.artists.map(
        async (id) => await this.artistsDbStorage.findOne(id),
      ),
    );
    result.albums = await Promise.all(
      favorites.albums.map(
        async (id) => await this.albumsDbStorage.findOne(id),
      ),
    );
    return result;
  }

  async addTrack(id: string) {
    if (await this.tracksDbStorage.findOne(id)) {
      await this.favoritesDbStorage.addTrack(id);
      return { message: 'Track added to favorites' } as MessageFavoritesDto;
    }
    return null;
  }

  async removeTrack(id: string) {
    const result = await this.favoritesDbStorage.deleteTrack(id);
    if (result)
      return { message: 'Track deleted from favorites' } as MessageFavoritesDto;
    return null;
  }

  async addArtist(id: string) {
    if (await this.artistsDbStorage.findOne(id)) {
      await this.favoritesDbStorage.addArtist(id);
      return { message: 'Artist added to favorites' } as MessageFavoritesDto;
    }
    return null;
  }

  async removeArtist(id: string) {
    const result = await this.favoritesDbStorage.deleteArtist(id);
    if (result)
      return {
        message: 'Artist deleted from favorites',
      } as MessageFavoritesDto;
    return null;
  }
  async addAlbum(id: string) {
    if (await this.albumsDbStorage.findOne(id)) {
      await this.favoritesDbStorage.addAlbum(id);
      return { message: 'Album added to favorites' } as MessageFavoritesDto;
    }
    return null;
  }

  async removeAlbum(id: string) {
    const result = await this.favoritesDbStorage.deleteAlbum(id);
    if (result)
      return { message: 'Album deleted from favorites' } as MessageFavoritesDto;
    return null;
  }
}
