import { Request, Response, NextFunction } from 'express';
import Database from '../database';
import { User } from '../models/User/User';
import { HttpError } from '../middlewares/errorHandler';

export class UserController {
  static async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const dataSource = Database.getInstance();
    const userRepository = dataSource.getRepository(User);
    try {
      const users = await userRepository.find();
      res.status(200).json(users);
    } catch (error) {
      next(
        new HttpError(
          error instanceof Error ? error.message : 'Неизвестная ошибка',
          500,
        ),
      );
    }
  }

  static async getUserById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const dataSource = Database.getInstance();
    const userRepository = dataSource.getRepository(User);
    try {
      const userId = parseInt(req.params.userId, 10);
      if (isNaN(userId)) {
        throw new HttpError('Неверный формат идентификатора пользователя', 400);
      }

      const user = await userRepository.findOne({ where: { id: userId } });

      if (user) {
        res.status(200).json(user);
      } else {
        throw new HttpError('Пользователь не найден', 404);
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

  static async createUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const dataSource = Database.getInstance();
    const userRepository = dataSource.getRepository(User);
    const { name, about, avatar } = req.body;
    const user = userRepository.create({ name, about, avatar });
    try {
      await userRepository.save(user);
      res.status(201).json(user);
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
