import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Order } from '../Order/Order';
import { Product } from '../Product/Product';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Order, (order) => order.items)
  order!: Order;

  @ManyToOne(() => Product, (product) => product.id)
  product!: Product;

  @Column()
  quantity!: number;
}
