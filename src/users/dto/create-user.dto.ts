import { Length, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @Length(8)
  login: string;

  @IsNotEmpty()
  password: string;
}
