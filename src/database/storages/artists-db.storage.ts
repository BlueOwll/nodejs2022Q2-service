import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from 'src/artists/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artists/dto/update-artist.dto';
import { Artist } from 'src/artists/entities/artist.entity';
import { v4 as uuidv4 } from 'uuid';

export class UpdateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UpdateError';
  }
}

@Injectable()
export class ArtistsDbStorage {
  private artists: Artist[] = [];

  async create(artistDto: CreateArtistDto): Promise<Artist> {
    const newArtist = {
      ...artistDto,
      id: uuidv4(),
    } as Artist;

    this.artists.push(newArtist);
    return newArtist;
  }

  async findAll(): Promise<Artist[]> {
    return this.artists;
  }

  async findOne(id: string): Promise<Artist> {
    return this.artists.find((item) => item.id === id);
  }

  async update(id: string, artistDto: UpdateArtistDto): Promise<Artist> {
    const artistIdx = this.artists.findIndex((entity) => entity.id === id);

    if (artistIdx === -1) return null;

    const changed = {
      id: id,
      ...artistDto,
    } as Artist;
    this.artists.splice(artistIdx, 1, changed);
    return changed;
  }

  async delete(id: string): Promise<Artist> {
    const idx = this.artists.findIndex((entity) => entity.id === id);

    if (idx === -1) return null;

    const deleted = this.artists[idx];

    this.artists.splice(idx, 1);
    return deleted;
  }
}
