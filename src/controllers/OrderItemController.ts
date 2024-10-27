import { Request, Response, NextFunction } from 'express';
import Database from '../database';
import { OrderItem } from '../models/OrderItem/OrderItem';
import { HttpError } from '../middlewares/errorHandler';

export class OrderItemController {
  static async getAllOrderItems(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const dataSource = Database.getInstance();
    const orderItemRepository = dataSource.getRepository(OrderItem);
    try {
      const orderItems = await orderItemRepository.find({
        relations: ['order', 'product'],
      });
      res.status(200).json(orderItems);
    } catch (error) {
      next(
        new HttpError(
          error instanceof Error ? error.message : 'Неизвестная ошибка',
          500,
        ),
      );
    }
  }

  static async getOrderItemById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const dataSource = Database.getInstance();
    const orderItemRepository = dataSource.getRepository(OrderItem);
    try {
      const orderItemId: number = parseInt(req.params.orderItemId, 10);
      if (isNaN(orderItemId)) {
        throw new HttpError(
          'Неверный формат идентификатора позиции заказа',
          400,
        );
      }

      const orderItem = await orderItemRepository.findOne({
        where: { id: orderItemId },
        relations: ['order', 'product'],
      });

      if (orderItem) {
        res.status(200).json(orderItem);
      } else {
        throw new HttpError('Позиция заказа не найдена', 404);
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

  static async createOrderItem(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const dataSource = Database.getInstance();
    const orderItemRepository = dataSource.getRepository(OrderItem);
    const { orderId, productId, quantity } = req.body;
    try {
      const orderItem = orderItemRepository.create({
        order: { id: orderId },
        product: { id: productId },
        quantity,
      });

      await orderItemRepository.save(orderItem);
      res.status(201).json(orderItem);
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
