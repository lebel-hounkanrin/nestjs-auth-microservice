import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule); 
  app.connectMicroservice( {
    transport: Transport.TCP,
    options: {
      host: "localhost",
      port: 4000
    }
  });
  await app.startAllMicroservices();
  await app.listen(3000);
  Logger.log("Auth microservice started");
}
bootstrap();
