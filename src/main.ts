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
  const logging = new LoggingService();
  app.useLogger(logging);

  await app.listen(PORT, () => {
    console.log('Server started on port that specified in env file', PORT);
  });

  process.on('uncaughtExceptionMonitor', (err, origin) => {
    logging.error(err, `uncaught in${origin}`);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logging.error(reason, 'unhandledRejection');
    process.exit(1);
  });
}
bootstrap();
