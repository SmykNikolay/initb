import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cart } from './Cart';
import { Order } from './Order';
import { Product } from './Product';

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
