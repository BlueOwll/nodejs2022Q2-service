import { Injectable } from '@nestjs/common';
import { ArtistsDbStorage } from 'src/database/users-db/artists-db.storage';
import { TracksDbStorage } from 'src/database/users-db/tracks-db.storage';
import { UpdateTrackDto } from 'src/tracks/dto/update-track.dto';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly artistsDbStorage: ArtistsDbStorage,
    private readonly tracksDbStorage: TracksDbStorage,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    return await this.artistsDbStorage.create(createArtistDto);
  }

  async findAll() {
    return this.artistsDbStorage.findAll();
  }

  async findOne(id: string) {
    return this.artistsDbStorage.findOne(id);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.artistsDbStorage.update(id, updateArtistDto);
  }

  async remove(id: string) {
    const removedArtist = await this.artistsDbStorage.delete(id);
    if (!removedArtist) return null;

    const tracks = await this.tracksDbStorage.findMany('artistId', id);
    tracks.forEach(async (item) => {
      const { id: trackId, ...updateTrackDto } = item;
      await this.tracksDbStorage.update(trackId, {
        ...updateTrackDto,
        artistId: null,
      } as UpdateTrackDto);
    });
    return removedArtist;
  }
}
