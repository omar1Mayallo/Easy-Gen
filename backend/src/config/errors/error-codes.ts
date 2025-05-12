export enum ValidationErrorCode {
  // Name Validation
  NAME_MUST_BE_STRING = 'NAME_MUST_BE_STRING',
  NAME_IS_REQUIRED = 'NAME_IS_REQUIRED',

  // Email Validation
  EMAIL_MUST_BE_VALID = 'EMAIL_MUST_BE_VALID',

  // Password Validation
  PASSWORD_MUST_BE_STRING = 'PASSWORD_MUST_BE_STRING',
  PASSWORD_MIN_LENGTH = 'PASSWORD_MIN_LENGTH',
}

export enum ErrorCode {
  // Validation Errors
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',

  // Database Errors
  DATABASE_ERROR = 'DATABASE_ERROR',
  UNIQUE_CONSTRAINT_VIOLATION = 'UNIQUE_CONSTRAINT_VIOLATION',

  // Authentication Errors
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',

  // General Errors
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  BAD_REQUEST = 'BAD_REQUEST',

  INVALID_MONGO_ID = 'INVALID_MONGO_ID',

  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
}

export const ErrorMessages: Record<ErrorCode, string> = {
  [ErrorCode.VALIDATION_ERROR]: 'Validation failed for the provided input',
  [ErrorCode.INVALID_INPUT]: 'Invalid input provided',
  [ErrorCode.DATABASE_ERROR]: 'A database error occurred',
  [ErrorCode.UNIQUE_CONSTRAINT_VIOLATION]: 'A unique constraint was violated',
  [ErrorCode.UNAUTHORIZED]: 'Authentication failed',
  [ErrorCode.FORBIDDEN]: 'Access denied',
  [ErrorCode.INTERNAL_SERVER_ERROR]: 'Something went wrong',
  [ErrorCode.NOT_FOUND]: 'Resource not found',
  [ErrorCode.BAD_REQUEST]: 'Bad request',
  [ErrorCode.INVALID_MONGO_ID]: 'Invalid MongoDB ObjectId',

  [ErrorCode.INVALID_CREDENTIALS]: 'Invalid email or password',
};
