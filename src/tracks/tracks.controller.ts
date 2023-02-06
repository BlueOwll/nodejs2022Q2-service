import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { UpdateError } from 'src/database/storages/tracks-db.storage';
import { FindOneParams } from './dto/find-one-params.dto';
import { Track } from './entities/track.entity';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createTrackDto: CreateTrackDto) {
    try {
      return this.tracksService.create(createTrackDto);
    } catch (err) {
      if (err instanceof UpdateError) {
        throw new BadRequestException(err.message);
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }

  @Get()
  async findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: FindOneParams) {
    const track = await this.tracksService.findOne(params.id);
    if (track) return track;
    throw new NotFoundException('Track not found');
  }

  @Put(':id')
  async update(
    @Param() params: FindOneParams,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    let track: Track;
    try {
      track = await this.tracksService.update(params.id, updateTrackDto);
      if (track) return track;
      throw new NotFoundException('Track not found');
    } catch (err) {
      if (err instanceof UpdateError) {
        throw new BadRequestException(err.message);
      } else if (err instanceof NotFoundException) {
        throw new NotFoundException('Track not found');
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param() params: FindOneParams): Promise<void> {
    const track = await this.tracksService.remove(params.id);
    if (track) return;
    throw new NotFoundException('Track not found');
  }
}
