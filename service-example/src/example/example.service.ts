import { Model } from 'mongoose';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Example, ExampleDocument } from './schema/example.schema';
import { CreateExampleDto } from './schema/createExample.dto';

@Injectable()
export class ExampleService {
  constructor(
    @InjectModel(Example.name) private exampleModel: Model<ExampleDocument>,
  ) {}

  async findAll(): Promise<Example[]> {
    return this.exampleModel.find().exec();
  }

  async findById(id: any): Promise<Example> {
    return this.exampleModel.findById(id).exec();
  }

  async create(createExampleDto: CreateExampleDto): Promise<Example> {
    const createdCat = new this.exampleModel(createExampleDto);
    return createdCat.save();
  }

  async update(
    id: string,
    createExampleDto: CreateExampleDto,
  ): Promise<Example> {
    try {
      const model = await this.exampleModel.findById(id).exec();
      model.name = createExampleDto.name;

      return model.save();
    } catch (error) {
      return null;
    }
  }
}
