import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { ServiceConfigInterface } from '../interface/serviceConfig.interface';
import { SecretManager } from './secretManager.config';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  async createMongooseOptions(): Promise<MongooseModuleOptions> {
    const serviceConfig: ServiceConfigInterface = await SecretManager(
      'services/example',
    );

    return {
      uri: serviceConfig.MONGODB_HOST,
    };
  }
}
