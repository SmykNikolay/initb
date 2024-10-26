// OrderController.ts
import { Request, Response, NextFunction } from 'express';
import Database from '../database';
import { Order } from '../models/Order/Order';
import { OrderItem } from '../models/OrderItem/OrderItem';
import { HttpError } from '../middlewares/errorHandler';

export class OrderController {
  static async getOrdersByUserId(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const dataSource = Database.getInstance();
    const orderRepository = dataSource.getRepository(Order);
    try {
      const userId = parseInt(req.params.userId, 10);
      if (isNaN(userId)) {
        throw new HttpError('Неверный формат идентификатора пользователя', 400);
      }

      const orders = await orderRepository.find({
        where: { user: { id: userId } },
        relations: ['items', 'items.product'],
      });

      res.status(200).json(orders);
    } catch (error) {
      next(
        new HttpError(
          error instanceof Error ? error.message : 'Неизвестная ошибка',
          500,
        ),
      );
    }
  }

  static async createOrder(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const dataSource = Database.getInstance();
    const orderRepository = dataSource.getRepository(Order);
    const { userId, items } = req.body;
    const order = orderRepository.create({
      user: { id: userId },
      status: 'Новый',
      items: [],
    });
    try {
      order.items = items.map((item: any) =>
        orderRepository.manager.create(OrderItem, {
          product: { id: item.productId },
          quantity: item.quantity,
          order,
        }),
      );

      await orderRepository.save(order);

      res.status(201).json(order);
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
