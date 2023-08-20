import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('examples')
export class PutUpdateController {
  constructor(
    @Inject('EXAMPLE_SERVICE')
    private readonly exampleServiceClient: ClientProxy,
  ) {}

  @Put(':id')
  async putUpdate(
    @Param('id') id: string,
    @Body() updateData: any,
  ): Promise<any> {
    const returnFrom = await firstValueFrom(
      this.exampleServiceClient.send<number>(
        { cmd: 'example_update' },
        {
          id: id,
          data: updateData,
        },
      ),
    );

    if (!returnFrom) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'ID not found.',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    return returnFrom;
  }
}
