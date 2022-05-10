import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('example')
export class ExampleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
}
