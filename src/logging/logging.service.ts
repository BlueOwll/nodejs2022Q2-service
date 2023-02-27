import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService extends ConsoleLogger {
  error(message: any, stack?: string, context?: string) {
    // add your tailored logic here
    // eslint-disable-next-line prefer-rest-params
    super.error(
      `CustomErr of ${context ? context : 'app'} [${
        stack ? stack : 'NestApplication'
      }] ${message}`,
    );
  }
  log(message: any, stack?: string, context?: string) {
    // add your tailored logic here
    // eslint-disable-next-line prefer-rest-params
    super.log(
      `CustomLog of ${context ? context : 'app'} [${
        stack ? stack : 'NestApplication'
      }] ${message}`,
    );
  }
  warn(message: any, stack?: string, context?: string) {
    // add your tailored logic here
    // eslint-disable-next-line prefer-rest-params
    super.error(
      `CustomWarn of ${context ? context : 'app'} [${
        stack ? stack : 'NestApplication'
      }] ${message}`,
    );
  }
}
