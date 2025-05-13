import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  Matches,
  IsEnum,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { ValidationErrorCode } from 'src/config/errors/error-codes';
import { RoleEnum } from './user.schema';

export class CreateUserDto {
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

  @ApiProperty({
    description: 'User role',
    enum: RoleEnum,
    default: RoleEnum.USER,
    required: false,
  })
  @IsOptional()
  @IsEnum(RoleEnum)
  role?: RoleEnum = RoleEnum.USER;
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

  @ApiProperty({
    description: 'User role',
    enum: RoleEnum,
    default: RoleEnum.USER,
    required: false,
  })
  @IsOptional()
  @IsEnum(RoleEnum)
  role?: RoleEnum = RoleEnum.USER;
}
