import { Injectable } from '@nestjs/common';
import { Favorites } from 'src/favorites/entities/favorite.entity';

@Injectable()
export class FavoritesDbStorage {
  private favorites: Favorites = {
    artists: [], // favorite artists ids
    albums: [], // favorite albums ids
    tracks: [], // favorite tracks ids
  };

  async getAll() {
    return this.favorites;
  }

  async addTrack(id: string) {
    this.favorites.tracks.push(id);
    return id;
  }

  async deleteTrack(id: string) {
    const idx = this.favorites.tracks.findIndex((item) => item === id);
    if (idx === -1) return null;
    this.favorites.tracks.splice(idx, 1);
    return id;
  }

  async addAlbum(id: string) {
    this.favorites.albums.push(id);
    return id;
  }

  async deleteAlbum(id: string) {
    const idx = this.favorites.albums.findIndex((item) => item === id);
    if (idx === -1) return null;
    this.favorites.albums.splice(idx, 1);
    return id;
  }
  async addArtist(id: string) {
    this.favorites.artists.push(id);
    return id;
  }

  async deleteArtist(id: string) {
    const idx = this.favorites.artists.findIndex((item) => item === id);
    if (idx === -1) return null;
    this.favorites.artists.splice(idx, 1);
    return id;
  }
}
