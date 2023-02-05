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
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UpdateError } from 'src/database/storages/albums-db.storage';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { FindOneParams } from './dto/find-one-params.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  async findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: FindOneParams) {
    const album = await this.albumsService.findOne(params.id);
    if (album) return album;
    throw new NotFoundException('Album not found');
  }

  @Put(':id')
  async update(
    @Param() params: FindOneParams,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    let album: Album;
    try {
      album = await this.albumsService.update(params.id, updateAlbumDto);
      if (album) return album;
      throw new NotFoundException('Album not found');
    } catch (err) {
      if (err instanceof UpdateError) {
        throw new BadRequestException(err.message);
      } else if (err instanceof NotFoundException) {
        throw new NotFoundException('Album not found');
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param() params: FindOneParams) {
    const album = await this.albumsService.remove(params.id);
    if (album) return;
    throw new NotFoundException('Album not found');
  }
}
