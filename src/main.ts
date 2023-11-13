import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('To Do')
    .addSecurity('token', {
      type: 'apiKey',
      scheme: 'Bearer',
      in: 'header',
      name: 'authorization',
    })
    .setDescription('Nest Js To Do')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  app.use(morgan('dev'));
  await app.listen(3000);
}
bootstrap();
