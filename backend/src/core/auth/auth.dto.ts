import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ValidationErrorCode } from 'src/config/errors/error-codes';
import { RoleEnum } from '../user/user.schema';

export class RegisterDto {
  @ApiProperty({ description: 'User name', example: 'John Doe' })
  @IsString({ message: ValidationErrorCode.NAME_MUST_BE_STRING })
  @IsNotEmpty({ message: ValidationErrorCode.NAME_IS_REQUIRED })
  name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john@example.com',
  })
  @IsEmail({}, { message: ValidationErrorCode.EMAIL_MUST_BE_VALID })
  email: string;

  @ApiProperty({ description: 'User password', example: 'password123' })
  @IsString({ message: ValidationErrorCode.PASSWORD_MUST_BE_STRING })
  @MinLength(6, { message: ValidationErrorCode.PASSWORD_MIN_LENGTH })
  password: string;

  @ApiProperty({
    description: 'User role',
    enum: RoleEnum,
    default: RoleEnum.USER,
    required: false,
  })
  @IsOptional()
  @IsEnum(RoleEnum)
  role?: RoleEnum;
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
  @MinLength(6, { message: ValidationErrorCode.PASSWORD_MIN_LENGTH })
  password: string;
}
