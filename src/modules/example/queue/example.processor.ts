import { Logger } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('example-queue')
export class ExampleProcessor {
  private readonly logger = new Logger(ExampleProcessor.name);

  @Process('example-queue-default')
  async handleQueueDefault(job: Job) {
    this.logger.debug(
      '[example-queue-default] executed. JOB data: ' + JSON.stringify(job.data),
    );
  }
}
