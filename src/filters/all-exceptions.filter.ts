import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { LoggingService } from 'src/logging/logging.service';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(private logging: LoggingService) {
    super();
  }
  catch(exception: unknown, host: ArgumentsHost) {
    this.logging.error(`Error ${exception}`);
    super.catch(exception, host);
  }
}
