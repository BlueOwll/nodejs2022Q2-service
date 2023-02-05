import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { FindOneParams } from './dto/find-one-params.dto';
import { PasswordError } from 'src/database/users-db/users-db.storage';
import { OutputUserDto } from './dto/output-user.dto';
import {
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common/exceptions';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param() params: FindOneParams) {
    const user = await this.usersService.findOne(params.id);
    if (user) {
      return user;
    }
    throw new NotFoundException('User not found');
  }

  @Put(':id')
  @HttpCode(200)
  async update(
    @Param() params: FindOneParams,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    let user: OutputUserDto;
    try {
      user = await this.usersService.changePassword(
        params.id,
        updatePasswordDto,
      );
    } catch (err) {
      if (err instanceof PasswordError) {
        throw new ForbiddenException(err.message);
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
    if (user) {
      return user;
    }
    throw new NotFoundException('User not found');
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param() params: FindOneParams) {
    const user = await this.usersService.remove(params.id);
    if (user) {
      return;
    }
    throw new NotFoundException('User not found');
  }
}
