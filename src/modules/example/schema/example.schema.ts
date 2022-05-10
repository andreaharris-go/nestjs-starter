import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExampleDocument = Example & Document;

@Schema()
export class Example {
  @Prop()
  name: string;
}

export const ExampleSchema = SchemaFactory.createForClass(Example);
