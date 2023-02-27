import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SetMetadata } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

export const Public = () => SetMetadata('isPublic', true);

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(AuthService)
  private authService;

  public constructor(private readonly reflector: Reflector) {}
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();

    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const request = ctx.getRequest<Request>();

    const authValue = request.headers['authorization'];
    // console.log(authValue);
    if (authValue) {
      const re = /Bearer.(.*)/;
      const token = authValue.match(re)[1];
      //console.log(token);
      try {
        await this.authService.validateToken(token);
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }
}
