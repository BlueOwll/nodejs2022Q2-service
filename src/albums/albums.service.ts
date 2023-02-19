import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Artist } from 'src/artists/entities/artist.entity';
import { AlbumsDbStorage } from 'src/database/storages/albums-db.storage';
import { FavoritesDbStorage } from 'src/database/storages/favorites-db.storage';
import { TracksDbStorage } from 'src/database/storages/tracks-db.storage';
import { UpdateTrackDto } from 'src/tracks/dto/update-track.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>, // private readonly albumsDbStorage: AlbumsDbStorage, // private readonly tracksDbStorage: TracksDbStorage, // private readonly favoritesDbStorage: FavoritesDbStorage,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.albumsRepository.save(
      this.albumsRepository.create(createAlbumDto),
    );
  }

  findAll() {
    return this.albumsRepository.find();
  }

  async findOne(id: string) {
    return this.albumsRepository.findOneBy({ id });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumsRepository.findOneBy({ id });
    if (!album) return null;
    return this.albumsRepository.save({ id, ...album, ...updateAlbumDto });
  }

  async remove(id: string) {
    const artist = await this.albumsRepository.findOneBy({ id });
    if (!artist) return null;
    return this.albumsRepository.remove(artist);

    // const removedAlbum = await this.albumsDbStorage.delete(id);
    // if (!removedAlbum) return null;

    // const tracks = await this.tracksDbStorage.findMany('albumId', id);
    // tracks.forEach(async (item) => {
    //   const { id: trackId, ...updateTrackDto } = item;
    //   await this.tracksDbStorage.update(trackId, {
    //     ...updateTrackDto,
    //     albumId: null,
    //   } as UpdateTrackDto);
    // });
    // await this.favoritesDbStorage.deleteAlbum(id);
    // return removedAlbum;
  }
}
