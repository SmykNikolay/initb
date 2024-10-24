import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../Product/Product';
import { Cart } from '../Cart/Cart';
import { Order } from '../Order/Order';

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

  @OneToMany(() => Product, (product) => product.user)
  products!: Product[];

  @OneToMany(() => Cart, (cart) => cart.user)
  cart!: Cart[];

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];
}
