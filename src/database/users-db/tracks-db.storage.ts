import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from 'src/tracks/dto/create-track.dto';
import { UpdateTrackDto } from 'src/tracks/dto/update-track.dto';
import { Track } from 'src/tracks/entities/track.entity';
import { v4 as uuidv4, validate } from 'uuid';

export class UpdateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UpdateError';
  }
}

@Injectable()
export class TracksDbStorage {
  private tracks: Track[] = [];

  async create(trackDto: CreateTrackDto): Promise<Track> {
    const newTrack = {
      ...trackDto,
      id: uuidv4(),
    } as Track;

    if (trackDto.albumId && !validate(trackDto.albumId))
      throw new UpdateError('No such album');
    if (trackDto.artistId && !validate(trackDto.artistId))
      throw new UpdateError('No such artist');

    this.tracks.push(newTrack);
    return newTrack;
  }

  async findAll(): Promise<Track[]> {
    return this.tracks;
  }

  async findOne(id: string): Promise<Track> {
    return this.tracks.find((item) => item.id === id);
  }

  async update(id: string, trackDto: UpdateTrackDto): Promise<Track> {
    const trackIdx = this.tracks.findIndex((entity) => entity.id === id);

    if (trackIdx === -1) return null;

    if (trackDto.albumId && !validate(trackDto.albumId))
      throw new UpdateError('No such album');
    if (trackDto.artistId && !validate(trackDto.artistId))
      throw new UpdateError('No such artist');

    const changed = {
      id: id,
      ...trackDto,
    } as Track;
    this.tracks.splice(trackIdx, 1, changed);
    return changed;
  }

  async delete(id: string): Promise<Track> {
    const idx = this.tracks.findIndex((entity) => entity.id === id);

    if (idx === -1) return null;

    const deleted = this.tracks[idx];

    this.tracks.splice(idx, 1);
    return deleted;
  }
}
