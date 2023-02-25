import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret, tokenExpireTime } from 'src/config/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: tokenExpireTime },
    }),
  ],
})
export class AuthModule {}
