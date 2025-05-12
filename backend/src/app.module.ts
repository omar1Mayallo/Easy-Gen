import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigOptions } from './config/env/env.config';
import { UserModule } from './core/user/user.module';
import { AuthModule } from './core/auth/auth.module';
import { EnvironmentVariables } from './config/env/env.schema';
import { LoggerModule } from './config/logger/logger.module';

@Module({
  imports: [
    // ______ BASE_CONFIGURATIONS_MODULES ______ //
    ConfigModule.forRoot(ConfigOptions),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService<EnvironmentVariables>,
      ) => ({
        uri: configService.get<string>('DB_CONNECTION_STRING'),
      }),
      inject: [ConfigService],
    }),
    LoggerModule,
    // _______ CORE_MODULES _______ //
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
