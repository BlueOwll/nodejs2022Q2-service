import { IsNotEmpty, Length } from 'class-validator';

export class SignupAuthDto {
  @Length(8)
  login: string;

  @IsNotEmpty()
  password: string;
}
