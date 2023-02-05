import { Injectable } from '@nestjs/common';
import { AlbumsDbStorage } from 'src/database/users-db/albums-db.storage';
import { TracksDbStorage } from 'src/database/users-db/tracks-db.storage';
import { UpdateTrackDto } from 'src/tracks/dto/update-track.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly albumsDbStorage: AlbumsDbStorage,
    private readonly tracksDbStorage: TracksDbStorage,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.albumsDbStorage.create(createAlbumDto);
  }

  findAll() {
    return this.albumsDbStorage.findAll();
  }

  async findOne(id: string) {
    return this.albumsDbStorage.findOne(id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.albumsDbStorage.update(id, updateAlbumDto);
  }

  async remove(id: string) {
    const removedAlbum = await this.albumsDbStorage.delete(id);
    if (!removedAlbum) return null;

    const tracks = await this.tracksDbStorage.findMany('albumId', id);
    tracks.forEach(async (item) => {
      const { id: trackId, ...updateTrackDto } = item;
      await this.tracksDbStorage.update(trackId, {
        ...updateTrackDto,
        albumId: null,
      } as UpdateTrackDto);
    });
    return removedAlbum;
  }
}
