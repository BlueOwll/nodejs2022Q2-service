import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;
  @IsOptional()
  artistId: string | null; // refers to Artist
  @IsOptional()
  albumId: string | null; // refers to Album
  @IsInt()
  duration: number; // integer number
}
