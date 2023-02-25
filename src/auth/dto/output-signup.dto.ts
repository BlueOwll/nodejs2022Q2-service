import { OmitType } from '@nestjs/mapped-types';
import User from '../../users/entities/user.entity';

export class OutputSignupDto extends OmitType(User, ['password'] as const) {}
