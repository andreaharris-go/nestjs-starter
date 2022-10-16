import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MongooseModule } from '@nestjs/mongoose';
import { Example, ExampleSchema } from './schema/example.schema';
import { ExampleMongoGetAllController } from './controller/exampleMongoGetAll.controller';
import { ExampleService } from './example.service';
import { ExampleMongoGetByIdController } from './controller/exampleMongoGetById.controller';
import { FetchDataSchedule } from './schedule/fetch-data.schedule';
import { ExampleProcessor } from './queue/example.processor';
import { ExampleQueueRunnerController } from './controller/exampleQueueRunner.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../config/configuration';
import { ExampleMongoCreateController } from './controller/exampleMongoCreate.controller';
import { RedisGetSetSchedule } from './schedule/redisGetSet.schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forFeature([
      {
        name: Example.name,
        schema: ExampleSchema,
      },
    ]),
    BullModule.registerQueue({
      name: 'example-queue',
      redis: {
        port: 6379,
      },
    }),
  ],
  providers: [
    ExampleService,
    FetchDataSchedule,
    ExampleProcessor,
    RedisGetSetSchedule,
  ],
  controllers: [
    ExampleMongoGetAllController,
    ExampleMongoGetByIdController,
    ExampleQueueRunnerController,
    ExampleMongoCreateController,
  ],
})
export class ExampleModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes(
        { path: 'mongo/examples', method: RequestMethod.GET },
        { path: 'mongo/examples/:id', method: RequestMethod.GET },
        { path: 'queue/examples/', method: RequestMethod.GET },
        { path: 'mongo/examples', method: RequestMethod.POST },
      );
  }
}
