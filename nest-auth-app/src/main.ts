import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  app.enableShutdownHooks();

  swaggerAPIDocumentation(app);

  await app.listen(process.env.PORT ?? 3000);
  app.get(WINSTON_MODULE_NEST_PROVIDER).log(`Server started on port ${process.env.PORT || 3000}`);

}
bootstrap();


function swaggerAPIDocumentation(app: any) {
  const config = new DocumentBuilder()
    .setTitle('NestJS Auth API')
    .setDescription('API documentation for authentication and user management')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const swaggerOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };

  SwaggerModule.setup('api-docs', app, document, swaggerOptions);
}