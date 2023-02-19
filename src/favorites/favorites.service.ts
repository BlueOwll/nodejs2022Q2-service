import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageFavoritesDto } from './dto/message-favorite.dto';
import { OutputFavoriteDto } from './dto/output-favorite.dto';
import { FavoritesAlbum } from './entities/favoriteAlbum.entity';
import { FavoritesArtist } from './entities/favoriteArtist.entity';
import { FavoritesTrack } from './entities/favoriteTrack.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesTrack)
    private tracksRepository: Repository<FavoritesTrack>,
    @InjectRepository(FavoritesAlbum)
    private albumsRepository: Repository<FavoritesAlbum>,
    @InjectRepository(FavoritesArtist)
    private artistsRepository: Repository<FavoritesArtist>,
  ) {}

  async findAll() {
    const result = new OutputFavoriteDto();

    result.tracks = (
      await this.tracksRepository.find({
        relations: {
          track: true,
        },
      })
    ).map((item) => item.track);
    result.albums = (
      await this.albumsRepository.find({
        relations: {
          album: true,
        },
      })
    ).map((item) => item.album);
    result.artists = (
      await this.artistsRepository.find({
        relations: {
          artist: true,
        },
      })
    ).map((item) => item.artist);
    // result.artists = await Promise.all(
    //   favorites.artists.map(
    //     async (id) => await this.artistsDbStorage.findOne(id),
    //   ),
    // );
    // result.albums = await Promise.all(
    //   favorites.albums.map(
    //     async (id) => await this.albumsDbStorage.findOne(id),
    //   ),
    // );
    return result;
  }

  async addTrack(id: string) {
    try {
      const result = await this.tracksRepository.save(
        this.tracksRepository.create({ trackId: id }),
      );
      return { message: 'Track added to favorites' } as MessageFavoritesDto;
    } catch {
      return null;
    }
  }

  async removeTrack(id: string) {
    const result = await this.tracksRepository.remove(
      this.tracksRepository.create({ trackId: id }),
    );
    if (result)
      return { message: 'Track deleted from favorites' } as MessageFavoritesDto;
    return null;
  }

  async addArtist(id: string) {
    try {
      const result = await this.artistsRepository.save(
        this.artistsRepository.create({ artistId: id }),
      );
      return { message: 'Artist added to favorites' } as MessageFavoritesDto;
    } catch {
      return null;
    }
  }

  async removeArtist(id: string) {
    const result = await this.artistsRepository.remove(
      this.artistsRepository.create({ artistId: id }),
    );
    if (result)
      return {
        message: 'Artist deleted from favorites',
      } as MessageFavoritesDto;
    return null;
  }
  async addAlbum(id: string) {
    try {
      const result = await this.albumsRepository.save(
        this.albumsRepository.create({ albumId: id }),
      );
      return { message: 'Album added to favorites' } as MessageFavoritesDto;
    } catch {
      return null;
    }
  }

  async removeAlbum(id: string) {
    const result = await this.albumsRepository.remove(
      this.albumsRepository.create({ albumId: id }),
    );
    if (result)
      return { message: 'Album deleted from favorites' } as MessageFavoritesDto;
    return null;
  }
}
