import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('examples')
export class GetByIdController {
  constructor(
    @Inject('EXAMPLE_SERVICE')
    private readonly exampleServiceClient: ClientProxy,
  ) {}

  @Get(':id')
  getById(@Param() params: any): Promise<any> {
    return firstValueFrom(
      this.exampleServiceClient.send<number>(
        { cmd: 'example_find_id' },
        params,
      ),
    );
  }
}
