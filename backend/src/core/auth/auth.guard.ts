import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ErrorCode, ErrorMessages } from 'src/config/errors/error-codes';
import { AuthService } from './auth.service';
import { RoleEnum } from '../user/user.schema';
import { RESTRICT_TO_KEY } from './restrictTo.decorator';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
    private reflector: Reflector,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    // Check for valid token
    if (!token) {
      this.logger.warn('No token provided', { path: request.path });
      throw new HttpException(
        {
          errorCode: ErrorCode.UNAUTHORIZED,
          message: ErrorMessages[ErrorCode.UNAUTHORIZED],
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      this.logger.debug('Verifying token', { path: request.path });
      const payload = await this.jwtService.verifyAsync(token);
      this.logger.debug('Token verified', { userId: payload.sub });

      const user = await this.authService.validateUser(payload.sub);
      this.logger.debug('User validated', { userId: user?._id || payload.sub });

      if (!user) {
        this.logger.warn('User not found for token', { userId: payload.sub });
        throw new HttpException(
          {
            errorCode: ErrorCode.UNAUTHORIZED,
            message: ErrorMessages[ErrorCode.UNAUTHORIZED],
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      request.user = user; // Attach user to request

      // Check for role restrictions
      const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
        RESTRICT_TO_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (requiredRoles) {
        this.logger.debug('Checking role restrictions', {
          userId: user._id,
          requiredRoles,
        });
        if (!requiredRoles.includes(user.role)) {
          this.logger.warn('Role access denied', {
            userId: user._id,
            userRole: user.role,
            requiredRoles,
            path: request.path,
          });
          throw new HttpException(
            {
              errorCode: ErrorCode.FORBIDDEN,
              message: ErrorMessages[ErrorCode.FORBIDDEN],
            },
            HttpStatus.FORBIDDEN,
          );
        }
      }

      this.logger.info('Access granted', {
        userId: user._id,
        path: request.path,
      });
      return true;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error('Token verification failed', {
        error: error.message,
        stack: error.stack,
        path: request.path,
      });
      throw new HttpException(
        {
          errorCode: ErrorCode.UNAUTHORIZED,
          message: ErrorMessages[ErrorCode.UNAUTHORIZED],
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
