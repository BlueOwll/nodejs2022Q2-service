import { Injectable } from '@nestjs/common';
import { TracksDbStorage } from 'src/database/users-db/tracks-db.storage';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(private readonly tracksDbStorage: TracksDbStorage) {}

  async create(createTrackDto: CreateTrackDto) {
    return await this.tracksDbStorage.create(createTrackDto);
  }

  async findAll() {
    return this.tracksDbStorage.findAll();
  }

  async findOne(id: string) {
    return this.tracksDbStorage.findOne(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.tracksDbStorage.update(id, updateTrackDto);
  }

  remove(id: string) {
    return this.tracksDbStorage.delete(id);
  }
}
