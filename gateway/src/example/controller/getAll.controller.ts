import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('examples')
export class GetAllController {
  constructor(
    @Inject('EXAMPLE_SERVICE')
    private readonly exampleServiceClient: ClientProxy,
  ) {}

  @Get()
  getAll(): Promise<any> {
    return firstValueFrom(
      this.exampleServiceClient.send<number>({ cmd: 'example_find_all' }, [9]),
    );
  }
}
