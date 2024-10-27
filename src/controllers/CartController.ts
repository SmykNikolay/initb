import { Request, Response, NextFunction } from 'express';
import Database from '../database';
import { Cart } from '../models/Cart/Cart';
import { CartItem } from '../models/CartItem/CartItem';
import { HttpError } from '../middlewares/errorHandler';

export class CartController {
  static async getCartByUserId(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const dataSource = Database.getInstance();
    const cartRepository = dataSource.getRepository(Cart);
    try {
      const userId = parseInt(req.params.userId, 10);
      if (isNaN(userId)) {
        throw new HttpError('Неверный формат идентификатора пользователя', 400);
      }

      const cart = await cartRepository.findOne({
        where: { user: { id: userId } },
        relations: ['items', 'items.product'],
      });

      if (cart) {
        res.status(200).json(cart);
      } else {
        throw new HttpError('Корзина не найдена', 404);
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

  static async addItemToCart(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const dataSource = Database.getInstance();
    const cartRepository = dataSource.getRepository(Cart);
    const cartItemRepository = dataSource.getRepository(CartItem);
    const { userId, productId, quantity } = req.body;
    try {
      let cart = await cartRepository.findOne({
        where: { user: { id: userId } },
        relations: ['items'],
      });

      if (!cart) {
        cart = cartRepository.create({ user: { id: userId }, items: [] });
      }

      const cartItem = cartItemRepository.create({
        product: { id: productId },
        quantity,
        cart,
      });

      cart.items.push(cartItem);

      await cartRepository.save(cart);

      res.status(201).json(cart);
    } catch (error) {
      next(
        new HttpError(
          error instanceof Error ? error.message : 'Неизвестная ошибка',
          400,
        ),
      );
    }
  }

  static async removeItemFromCart(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const dataSource = Database.getInstance();
    const cartItemRepository = dataSource.getRepository(CartItem);
    const cartRepository = dataSource.getRepository(Cart);
    const { userId, productId } = req.body;
    try {
      const cart = await cartRepository.findOne({
        where: { user: { id: userId } },
        relations: ['items'],
      });

      if (!cart) {
        throw new HttpError('Корзина не найдена', 404);
      }

      cart.items = cart.items.filter((item) => item.product.id !== productId);

      await cartRepository.save(cart);

      res.status(200).json(cart);
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
