import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 50, unique: true })
  article!: string;

  @Column({ length: 500 })
  description!: string;

  @Column('decimal')
  price!: number;

  @ManyToOne(() => User, (user) => user.products)
  user!: User;
}
