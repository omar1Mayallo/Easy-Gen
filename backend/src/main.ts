import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { EnvironmentVariables } from './config/env/env.schema';
import { GlobalExceptionFilter } from './config/errors/exception-filter';
import { GlobalValidationPipe } from './config/errors/pipes/global-validation-pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // Create NestJS application with Winston logger
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService<EnvironmentVariables>);

  // ____________ MIDDLEWARES ____________ //
  app.enableCors({
    origin: configService.get<string>('CLIENT_URL'),
    methods: 'GET,PUT,PATCH,POST,DELETE',
  });
  app.use(helmet());
  app.use(compression());

  // ____________ VALIDATION_PIPES ____________ //
  app.useGlobalPipes(new GlobalValidationPipe());

  // ____________ EXCEPTION_FILTERS ____________ //
  app.useGlobalFilters(new GlobalExceptionFilter());

  const globalPrefix = configService.get<string>('API_PREFIX')!;
  const port = configService.get<number>('APP_PORT')!;
  const serverUrl = configService.get<string>('SERVER_URL');
  const mode = configService.get<string>('NODE_ENV');

  const apiUrl = `${serverUrl}${globalPrefix}`;

  // ____________ SWAGGER ____________ //
  const config = new DocumentBuilder()
    .setTitle('Easy Generator API')
    .setDescription('API documentation for Easy Generator Task')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .addServer(apiUrl)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'MyApp API Docs',
  });

  // ____________ START_APP ____________ //
  app.setGlobalPrefix(globalPrefix);

  await app.listen(port, () => {
    Logger.verbose(`App run on ${`${apiUrl} in ${mode} mode`}`);
  });
}
bootstrap();
