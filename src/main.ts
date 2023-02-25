import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './auth/auth.guard';
import { PORT } from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const reflector = app.get(Reflector);
  // app.useGlobalGuards(new AuthGuard(reflector));

  await app.listen(PORT, () => {
    console.log('Server started on port that specified in env file', PORT);
  });
}
bootstrap();
