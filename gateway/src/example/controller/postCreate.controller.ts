import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('examples')
export class PostCreateController {
  constructor(
    @Inject('EXAMPLE_SERVICE')
    private readonly exampleServiceClient: ClientProxy,
  ) {}

  @Post()
  postCreate(@Body() bodyData: any): Promise<any> {
    return firstValueFrom(
      this.exampleServiceClient.send<number>(
        { cmd: 'example_create' },
        bodyData,
      ),
    );
  }
}
