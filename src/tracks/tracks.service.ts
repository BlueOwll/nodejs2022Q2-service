import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoritesDbStorage } from 'src/database/storages/favorites-db.storage';
import { TracksDbStorage } from 'src/database/storages/tracks-db.storage';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>, // private readonly tracksDbStorage: TracksDbStorage, // private readonly favoritesDbStorage: FavoritesDbStorage,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    return await this.tracksRepository.save(
      this.tracksRepository.create(createTrackDto),
    );
  }

  async findAll() {
    return this.tracksRepository.find();
  }

  async findOne(id: string) {
    return this.tracksRepository.findOneBy({ id });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.tracksRepository.findOneBy({ id });
    if (!track) return null;
    return this.tracksRepository.save({ id, ...track, ...updateTrackDto });
  }

  async remove(id: string) {
    const track = await this.tracksRepository.findOneBy({ id });
    if (!track) return null;

    await this.tracksRepository.delete(id);
    // await this.favoritesDbStorage.deleteTrack(id);
    return track;
  }
}
