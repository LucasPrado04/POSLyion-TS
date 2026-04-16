import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './configs';

async function bootstrap() {
  const logger = new Logger('Main-PagosMS')
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  await app.listen(envs.port);
  logger.log(`PagosMS corriendo en el puerto ${envs.port}`)
}
bootstrap();
