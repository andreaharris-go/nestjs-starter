import { Injectable, Logger } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class RedisGetSetSchedule {
  private readonly logger = new Logger(RedisGetSetSchedule.name);
  constructor(@InjectRedis() private readonly redis: Redis) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleCron() {
    await this.redis.set('test_redis', Math.random());
    const ranNumber = await this.redis.get('test_redis');
    this.logger.debug(
      '[src/example/schedule/RedisGetSetSchedule] random number: ' + ranNumber,
    );
  }
}
