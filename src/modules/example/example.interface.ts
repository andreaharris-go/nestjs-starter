import { ExampleEntity } from './example.entity';

interface ExampleData {
  title: string;
}

export interface ExampleRO {
  example: ExampleEntity;
}

export interface ExamplesRO {
  examples: ExampleEntity[];
  examplesCount: number;
}
