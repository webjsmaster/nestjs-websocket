import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

const port = +process.env.API_PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe()); // валидация
  app.enableCors();

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(new JwtService(), reflector));
  // app.useGlobalFilters(new AllExceptionsFilter(new HttpAdapterHost<AbstractHttpAdapter>()))

  await app.listen(port);
}

bootstrap().then(() => {
  console.log('App started on', port, 'port');
});
