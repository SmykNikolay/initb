import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../User/User';
import { CartItem } from '../CartItem/CartItem';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.cart)
  user!: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
  items!: CartItem[];
}
