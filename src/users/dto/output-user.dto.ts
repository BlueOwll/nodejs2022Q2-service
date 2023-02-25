import { OmitType } from '@nestjs/mapped-types';
import User from '../entities/user.entity';

export class OutputUserDto extends OmitType(User, ['password'] as const) {}
