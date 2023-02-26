import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { AuthGuard } from './guards/auth.guard';
import { PORT } from './config/config';
import { LoggingService } from './logging/logging.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // const reflector = app.get(Reflector);
  // app.useGlobalGuards(new AuthGuard(reflector));
  app.useLogger(new LoggingService());

  await app.listen(PORT, () => {
    console.log('Server started on port that specified in env file', PORT);
  });
}
bootstrap();
