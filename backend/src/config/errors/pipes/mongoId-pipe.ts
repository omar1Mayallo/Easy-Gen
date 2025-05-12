import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { ErrorCode, ErrorMessages } from '../error-codes';

@Injectable()
export class MongoIdPipe implements PipeTransform {
  transform(value: string): string {
    if (!Types.ObjectId.isValid(value)) {
      throw new HttpException(
        {
          errorCode: ErrorCode.INVALID_MONGO_ID,
          message: ErrorMessages[ErrorCode.INVALID_MONGO_ID],
          details: { field: 'id', value },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}
