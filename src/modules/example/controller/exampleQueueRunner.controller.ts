import { Get, Controller, Logger, Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('queue/examples')
@Controller('queue/examples')
@Injectable()
export class ExampleQueueRunnerController {
  private readonly logger = new Logger(ExampleQueueRunnerController.name);
  constructor(
    @InjectQueue('example-queue') private readonly exampleQueue: Queue,
  ) {}

  @ApiOperation({ summary: 'Queue job execution.' })
  @ApiResponse({ status: 200, description: 'Queue job execution SUCCESS.' })
  @Get()
  async queueTrigger(): Promise<any> {
    this.exampleQueue.add('example-queue-default', { data: 'xxxx' });
    this.logger.debug('Queue executed.');
    return { data: 'executed' };
  }
}
