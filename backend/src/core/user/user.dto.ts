import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { ValidationErrorCode } from 'src/config/errors/error-codes';

export class CreateUserDto {
  @ApiProperty({ description: 'User name', example: 'Jane Doe' })
  @IsString({ message: ValidationErrorCode.NAME_MUST_BE_STRING })
  @IsNotEmpty({ message: ValidationErrorCode.NAME_IS_REQUIRED })
  name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'jane@example.com',
  })
  @IsEmail({}, { message: ValidationErrorCode.EMAIL_MUST_BE_VALID })
  email: string;

  @ApiProperty({ description: 'User password', example: 'password123' })
  @IsString({ message: ValidationErrorCode.PASSWORD_MUST_BE_STRING })
  @MinLength(6, { message: ValidationErrorCode.PASSWORD_MIN_LENGTH })
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'User name',
    example: 'Jane Smith',
    required: false,
  })
  @IsOptional()
  @IsString({ message: ValidationErrorCode.NAME_MUST_BE_STRING })
  name?: string;

  @ApiProperty({
    description: 'User email address',
    example: 'jane.smith@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: ValidationErrorCode.EMAIL_MUST_BE_VALID })
  email?: string;

  @ApiProperty({
    description: 'User password',
    example: 'newpassword123',
    required: false,
  })
  @IsOptional()
  @IsString({ message: ValidationErrorCode.PASSWORD_MUST_BE_STRING })
  @MinLength(6, { message: ValidationErrorCode.PASSWORD_MIN_LENGTH })
  password?: string;
}
