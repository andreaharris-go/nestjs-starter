import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { SecretManager } from './common/secretManager.config';
import { ServiceConfigInterface } from './interface/serviceConfig.interface';

async function bootstrap() {
  const serviceConfig: ServiceConfigInterface = await SecretManager(
    'services/example',
  );

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: serviceConfig.HOST,
        port: serviceConfig.PORT,
      },
    },
  );
  await app.listen();
}
bootstrap();
