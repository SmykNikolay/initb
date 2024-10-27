import { Request, Response, NextFunction } from 'express';
import Database from '../database';
import { CartItem } from '../models/CartItem';
import { HttpError } from '../middlewares/errorHandler';

export class CartItemController {
  static async getAllCartItems(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const dataSource = Database.getInstance();
    const cartItemRepository = dataSource.getRepository(CartItem);
    try {
      const cartItems = await cartItemRepository.find({
        relations: ['cart', 'product'],
      });
      res.status(200).json(cartItems);
    } catch (error) {
      next(
        new HttpError(
          error instanceof Error ? error.message : 'Неизвестная ошибка',
          500,
        ),
      );
    }
  }

  static async getCartItemById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const dataSource = Database.getInstance();
    const cartItemRepository = dataSource.getRepository(CartItem);
    try {
      const cartItemId: number = parseInt(req.params.cartItemId, 10);
      if (isNaN(cartItemId)) {
        throw new HttpError(
          'Неверный формат идентификатора элемента корзины',
          400,
        );
      }

      const cartItem = await cartItemRepository.findOne({
        where: { id: cartItemId },
        relations: ['cart', 'product'],
      });

      if (cartItem) {
        res.status(200).json(cartItem);
      } else {
        throw new HttpError('Элемент корзины не найден', 404);
      }
    } catch (error) {
      next(
        error instanceof HttpError
          ? error
          : new HttpError(
              error instanceof Error ? error.message : 'Неизвестная ошибка',
              500,
            ),
      );
    }
  }

  static async createCartItem(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const dataSource = Database.getInstance();
    const cartItemRepository = dataSource.getRepository(CartItem);
    const { cartId, productId, quantity } = req.body;
    try {
      const cartItem = cartItemRepository.create({
        cart: { id: cartId },
        product: { id: productId },
        quantity,
      });

      await cartItemRepository.save(cartItem);
      res.status(201).json(cartItem);
    } catch (error) {
      next(
        new HttpError(
          error instanceof Error ? error.message : 'Неизвестная ошибка',
          400,
        ),
      );
    }
  }
}
