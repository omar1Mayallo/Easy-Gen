import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ErrorCode, ErrorMessages } from '../error-codes';

@Injectable()
export class GlobalValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const formattedErrors = errors.map((error) => ({
        field: error.property,
        message: Object.values(error.constraints!)[0], // Take the first constraint message ex: {minLength: 'PASSWORD_MIN_LENGTH', isString: 'PASSWORD_MUST_BE_STRING'}
      }));

      throw new HttpException(
        {
          errorCode: ErrorCode.VALIDATION_ERROR,
          message: ErrorMessages[ErrorCode.VALIDATION_ERROR],
          details: formattedErrors,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
