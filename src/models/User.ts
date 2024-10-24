import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 30 })
  name!: string;

  @Column({ length: 200 })
  about!: string;

  @Column()
  avatar!: string;
}
