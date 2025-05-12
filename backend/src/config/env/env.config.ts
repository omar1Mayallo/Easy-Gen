import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ConfigModuleOptions } from '@nestjs/config';
import { EnvironmentVariables } from './env.schema';

function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

export const ConfigOptions: ConfigModuleOptions = {
  isGlobal: true,
  validate,
};
