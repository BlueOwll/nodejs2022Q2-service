import { Injectable } from '@nestjs/common';
import { FavoritesDbStorage } from 'src/database/storages/favorites-db.storage';
import { TracksDbStorage } from 'src/database/storages/tracks-db.storage';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(
    private readonly tracksDbStorage: TracksDbStorage,
    private readonly favoritesDbStorage: FavoritesDbStorage,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    return await this.tracksDbStorage.create(createTrackDto);
  }

  async findAll() {
    return this.tracksDbStorage.findAll();
  }

  async findOne(id: string) {
    return this.tracksDbStorage.findOne(id);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.tracksDbStorage.update(id, updateTrackDto);
  }

  async remove(id: string) {
    const removed = await this.tracksDbStorage.delete(id);
    if (!removed) return null;
    await this.favoritesDbStorage.deleteTrack(id);
    return removed;
  }
}
