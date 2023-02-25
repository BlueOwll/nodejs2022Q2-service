import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>, // private readonly artistsDbStorage: ArtistsDbStorage, // private readonly tracksDbStorage: TracksDbStorage, // private readonly favoritesDbStorage: FavoritesDbStorage,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    return await this.artistsRepository.save(
      this.artistsRepository.create(createArtistDto),
    );
  }

  async findAll() {
    return this.artistsRepository.find();
  }

  async findOne(id: string) {
    return this.artistsRepository.findOneBy({ id });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.artistsRepository.findOneBy({ id });
    if (!artist) return null;
    return this.artistsRepository.save({ id, ...artist, ...updateArtistDto });
  }

  async remove(id: string) {
    const artist = await this.artistsRepository.findOneBy({ id });
    if (!artist) return null;
    return this.artistsRepository.remove(artist);
    // const removedArtist = await this.artistsDbStorage.delete(id);
    // if (!removedArtist) return null;

    // const tracks = await this.tracksDbStorage.findMany('artistId', id);
    // tracks.forEach(async (item) => {
    //   const { id: trackId, ...updateTrackDto } = item;
    //   await this.tracksDbStorage.update(trackId, {
    //     ...updateTrackDto,
    //     artistId: null,
    //   } as UpdateTrackDto);
    // });
    // await this.favoritesDbStorage.deleteArtist(id);
    // return removedArtist;
  }
}
