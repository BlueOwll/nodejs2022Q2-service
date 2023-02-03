import { Length, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @Length(8)
  login: string;

  @IsNotEmpty()
  password: string;
}
