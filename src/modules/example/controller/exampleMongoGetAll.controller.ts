import { Get, Controller } from '@nestjs/common';
import { ExampleService } from '../example.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Example } from '../schema/example.schema';

@ApiTags('mongo/examples')
@Controller('mongo/examples')
export class ExampleMongoGetAllController {
  constructor(private readonly exampleService: ExampleService) {}

  @ApiOperation({ summary: 'Get all examples route' })
  @ApiResponse({ status: 200, description: 'Return all examples data.' })
  @Get()
  async findAll(): Promise<Example[]> {
    return await this.exampleService.findAll();
  }
}
