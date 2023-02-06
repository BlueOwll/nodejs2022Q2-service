import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { FindOneParams } from './dto/find-one-params.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  async findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: FindOneParams) {
    const artist = await this.artistsService.findOne(params.id);
    if (artist) return artist;
    throw new NotFoundException('Artist not found');
  }

  @Put(':id')
  async update(
    @Param() params: FindOneParams,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artist = await this.artistsService.update(params.id, updateArtistDto);
    if (artist) return artist;
    throw new NotFoundException('Artist not found');
    return;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param() params: FindOneParams) {
    const artist = await this.artistsService.remove(params.id);
    if (artist) return;
    throw new NotFoundException('Artist not found');
  }
}
