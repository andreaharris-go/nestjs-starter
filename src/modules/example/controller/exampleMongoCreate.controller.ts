import { Body, Post, Controller, Catch } from '@nestjs/common';
import { ExampleService } from '../example.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateExample } from '../schema/create-example.schema';

@ApiTags('mongo/examples')
@Controller('mongo/examples')
@Catch()
export class ExampleMongoCreateController {
  constructor(private readonly exampleService: ExampleService) {}

  @ApiOperation({ summary: 'POST create examples route' })
  @ApiResponse({ status: 200, description: 'Return all examples data.' })
  @Post()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(
    @Body() createExampleSchema: CreateExample,
  ): Promise<CreateExample[]> {
    return await this.exampleService.findAll();
  }
}
