import { NestExpressApplication } from '@nestjs/platform-express';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

export function handleInitSwagger(app: NestExpressApplication) {
  const config = new DocumentBuilder()
    .setTitle('API DOCUMENT')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('WorkFlow')
    .addBearerAuth(
      {
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    // include: [StaffModule, CatsModule],
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);
}
