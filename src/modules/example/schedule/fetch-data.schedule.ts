import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class FetchDataSchedule {
  private readonly logger = new Logger(FetchDataSchedule.name);

  @Cron(CronExpression.EVERY_5_SECONDS)
  handleCron() {
    // this.logger.debug('stdsafdsf');
  }
}
