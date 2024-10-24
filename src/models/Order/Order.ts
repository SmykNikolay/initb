import 'reflect-metadata';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../User/User';
import { OrderItem } from '../OrderItem/OrderItem';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 20 })
  status!: string;

  @ManyToOne(() => User, (user) => user.orders)
  user!: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items!: OrderItem[];
}
