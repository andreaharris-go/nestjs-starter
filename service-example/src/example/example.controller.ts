import { Catch, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ExampleService } from './example.service';
import { Example } from './schema/example.schema';

@Controller()
@Catch()
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @MessagePattern({ cmd: 'example_find_all' })
  async findAll(): Promise<Example[]> {
    return await this.exampleService.findAll();
  }

  @MessagePattern({ cmd: 'example_find_id' })
  async findById(params: { id: string }): Promise<Example> {
    return await this.exampleService.findById(params.id);
  }

  @MessagePattern({ cmd: 'example_create' })
  async create(params: { name: string }): Promise<Example> {
    return await this.exampleService.create(params);
  }

  @MessagePattern({ cmd: 'example_update' })
  async update(params: { id: string; data: any }): Promise<Example> {
    return await this.exampleService.update(params.id, params.data);
  }
}
