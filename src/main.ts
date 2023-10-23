import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { json } from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const port = +process.env.API_PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Websocket example')
    .setDescription('The websocket API description')
    .setVersion('1.0')
    .addTag('websocket')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe()); // валидация
  app.enableCors();

  app.use(json({ limit: '50MB' }));

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(new JwtService(), reflector));
  // app.useGlobalFilters(new AllExceptionsFilter(new HttpAdapterHost<AbstractHttpAdapter>()))

  await app.listen(port);
}

bootstrap().then(() => {
  console.log('App started on', port, 'port');
});
