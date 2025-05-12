import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { MongoServerError } from 'mongodb';
import { ErrorCode, ErrorMessages } from '../errors/error-codes';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorCode = ErrorCode.INTERNAL_SERVER_ERROR;
    let message = ErrorMessages[ErrorCode.INTERNAL_SERVER_ERROR];
    let details: any = null;
    let stack: string | undefined;

    if (exception instanceof HttpException) {
      // Handle HTTP exceptions (including those thrown by CustomValidationPipe)
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse() as any;

      errorCode = exceptionResponse.errorCode || ErrorCode.BAD_REQUEST;
      message = exceptionResponse.message || ErrorMessages[errorCode];
      details = exceptionResponse.details || null;
      stack = exception.stack;
    } else if (this.isMongoError(exception)) {
      // Handle MongoDB errors
      status = HttpStatus.BAD_REQUEST;
      errorCode = ErrorCode.DATABASE_ERROR;
      message = ErrorMessages[ErrorCode.DATABASE_ERROR];

      if (exception.code === 11000) {
        // Handle unique constraint violation
        errorCode = ErrorCode.UNIQUE_CONSTRAINT_VIOLATION;
        const field = Object.keys(exception.keyValue)[0];
        message = `${field} already exists`;
        details = {
          code: exception.code,
          keyValue: exception.keyValue,
        };
      } else {
        details = {
          code: exception.code,
          keyValue: exception.keyValue,
        };
      }
      stack = exception.stack;
    } else {
      // Handle uncaught errors
      Logger.error('Unhandled Exception', exception);
      if (exception instanceof Error) {
        stack = exception.stack;
        details = { message: exception.message };
      }
    }

    const responseBody = { errorCode, message, details, stack };
    response.status(status).json(responseBody);
  }

  private isMongoError(exception: unknown): exception is MongoServerError {
    return (
      typeof exception === 'object' &&
      exception !== null &&
      'code' in exception &&
      'keyValue' in exception
    );
  }
}
