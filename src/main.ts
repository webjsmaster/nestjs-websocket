import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = +process.env.API_PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(port);
}
bootstrap().then(() => {
  console.log('App started on', port, 'port');
});
