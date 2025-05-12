import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '../user/user.schema';

export const RESTRICT_TO_KEY = 'restrictTo';
export const RestrictTo = (...roles: RoleEnum[]) =>
  SetMetadata(RESTRICT_TO_KEY, roles);
