import { Get, Controller, Param } from '@nestjs/common';
import { ExampleService } from '../example.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Example } from '../schema/example.schema';

@ApiTags('mongo/examples')
@Controller('mongo/examples')
export class ExampleMongoGetByIdController {
  constructor(private readonly exampleService: ExampleService) {}

  @ApiOperation({ summary: 'Get one by ID on examples route' })
  @ApiResponse({ status: 200, description: 'Return a example data.' })
  @Get(':id')
  async findOne(@Param() params): Promise<Example[]> {
    console.log(params.id);
    return await this.exampleService.findAll();
  }
}
