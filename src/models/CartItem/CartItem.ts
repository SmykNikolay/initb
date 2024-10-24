import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Cart } from '../Cart/Cart';
import { Product } from '../Product/Product';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Cart, (cart) => cart.items)
  cart!: Cart;

  @ManyToOne(() => Product, (product) => product.id)
  product!: Product;

  @Column()
  quantity!: number;
}
