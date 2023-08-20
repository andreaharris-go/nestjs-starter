import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { GetAllController } from './controller/getAll.controller';
import { PostCreateController } from './controller/postCreate.controller';
import { GetByIdController } from './controller/getById.controller';
import { PutUpdateController } from './controller/putUpdate.controller';

@Module({
  imports: [],
  controllers: [
    GetAllController,
    PostCreateController,
    GetByIdController,
    PutUpdateController,
  ],
  providers: [
    {
      provide: 'EXAMPLE_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          options: {
            port: 3002,
            host: '0.0.0.0',
          },
          transport: Transport.TCP,
        });
      },
    },
  ],
})
export class ExampleModule {}
