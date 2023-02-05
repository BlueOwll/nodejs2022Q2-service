import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FindOneParams } from './dto/find-one-params.dto';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  async addTrack(@Param() params: FindOneParams) {
    const result = await this.favoritesService.addTrack(params.id);
    if (result) return result;
    throw new UnprocessableEntityException('Track not found');
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(@Param() params: FindOneParams) {
    const result = await this.favoritesService.removeTrack(params.id);
    if (result) return result;
    throw new NotFoundException('Track not favorite');
  }
  @Post('artist/:id')
  async addArtist(@Param() params: FindOneParams) {
    const result = await this.favoritesService.addArtist(params.id);
    if (result) return result;
    throw new UnprocessableEntityException('Artist not exists');
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(@Param() params: FindOneParams) {
    const result = await this.favoritesService.removeArtist(params.id);
    if (result) return result;
    throw new NotFoundException('Artist not favorite');
  }
  @Post('album/:id')
  async addAlbum(@Param() params: FindOneParams) {
    const result = await this.favoritesService.addAlbum(params.id);
    if (result) return result;
    throw new UnprocessableEntityException('Album not exists');
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(@Param() params: FindOneParams) {
    const result = await this.favoritesService.removeAlbum(params.id);
    if (result) return result;
    throw new NotFoundException('Album not favorite');
  }
}
