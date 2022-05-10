import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsNotEmpty } from 'class-validator';

export type CreateExampleDocument = CreateExample & Document;

@Schema()
export class CreateExample {
  @Prop()
  @IsNotEmpty()
  name: string;
}

export const CreateSchema = SchemaFactory.createForClass(CreateExample);
