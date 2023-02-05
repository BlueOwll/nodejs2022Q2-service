import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from 'src/albums/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/albums/dto/update-album.dto';
import { Album } from 'src/albums/entities/album.entity';
import { v4 as uuidv4, validate } from 'uuid';

export class UpdateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UpdateError';
  }
}

@Injectable()
export class AlbumsDbStorage {
  private albums: Album[] = [];

  async create(albumDto: CreateAlbumDto): Promise<Album> {
    const newAlbum = {
      ...albumDto,
      id: uuidv4(),
    } as Album;

    if (albumDto.artistId && !validate(albumDto.artistId))
      throw new UpdateError('No such artist');

    this.albums.push(newAlbum);
    return newAlbum;
  }

  async findAll(): Promise<Album[]> {
    return this.albums;
  }

  async findOne(id: string): Promise<Album> {
    return this.albums.find((item) => item.id === id);
  }

  async update(id: string, albumDto: UpdateAlbumDto): Promise<Album> {
    const albumIdx = this.albums.findIndex((entity) => entity.id === id);

    if (albumIdx === -1) return null;

    if (albumDto.artistId && !validate(albumDto.artistId))
      throw new UpdateError('No such artist');

    const changed = {
      id: id,
      ...albumDto,
    } as Album;
    this.albums.splice(albumIdx, 1, changed);
    return changed;
  }

  async delete(id: string): Promise<Album> {
    const idx = this.albums.findIndex((entity) => entity.id === id);

    if (idx === -1) return null;

    const deleted = this.albums[idx];

    this.albums.splice(idx, 1);
    return deleted;
  }
}
