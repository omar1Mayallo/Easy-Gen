import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { ValidationErrorCode } from 'src/config/errors/error-codes';

export class RegisterDto {
  @ApiProperty({ description: 'User name', example: 'John Doe' })
  @IsString({ message: ValidationErrorCode.NAME_MUST_BE_STRING })
  @MinLength(3, { message: ValidationErrorCode.NAME_MIN_LENGTH })
  @IsNotEmpty({ message: ValidationErrorCode.NAME_IS_REQUIRED })
  name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john@example.com',
  })
  @IsEmail({}, { message: ValidationErrorCode.EMAIL_MUST_BE_VALID })
  email: string;

  @ApiProperty({ description: 'User password', example: 'P@ssw0rd' })
  @IsString({ message: ValidationErrorCode.PASSWORD_MUST_BE_STRING })
  @MinLength(8, { message: ValidationErrorCode.PASSWORD_MIN_LENGTH })
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: ValidationErrorCode.PASSWORD_REQUIREMENTS,
  })
  password: string;
}

export class LoginDto {
  @ApiProperty({
    description: 'User email address',
    example: 'john@example.com',
  })
  @IsEmail({}, { message: ValidationErrorCode.EMAIL_MUST_BE_VALID })
  email: string;

  @ApiProperty({ description: 'User password', example: 'password123' })
  @IsString({ message: ValidationErrorCode.PASSWORD_MUST_BE_STRING })
  password: string;
}
