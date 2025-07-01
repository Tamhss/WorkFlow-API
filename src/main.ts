import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { join } from 'path';

import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { getWinstonFormat, getWinstonPathFile } from './helper/utils';
import { handleInitSwagger } from './core/swagger';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger({
      format: getWinstonFormat(),
      transports: [
        getWinstonPathFile(),
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
      ],
    }),
    rawBody: true,
  });

  app.setGlobalPrefix('api/v1', { exclude: ['/'] });

  handleInitSwagger(app);

  app.use(helmet());
  app.enableCors();
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.use(json({ limit: '50mb' }));

  // somewhere in your initialization file
  app.use(cookieParser());
  app.useStaticAssets(join(__dirname, '..', 'static'));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
