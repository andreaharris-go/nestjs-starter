import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Example, ExampleDocument } from './schema/example.schema';

@Injectable()
export class ExampleService {
  constructor(
    @InjectModel(Example.name) private exampleModel: Model<ExampleDocument>,
  ) {}

  async findAll(): Promise<Example[]> {
    return this.exampleModel.find().exec();
  }
}
