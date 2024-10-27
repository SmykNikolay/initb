import { Request, Response, NextFunction } from 'express';
import Database from '../database';
import { Product } from '../models/Product';
import { HttpError } from '../middlewares/errorHandler';

export class ProductController {
  static async getAllProducts(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const dataSource = Database.getInstance();
    const productRepository = dataSource.getRepository(Product);
    try {
      const products = await productRepository.find();
      res.status(200).json(products);
    } catch (error) {
      next(
        new HttpError(
          error instanceof Error ? error.message : 'Неизвестная ошибка',
          500,
        ),
      );
    }
  }

  static async getProductById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const dataSource = Database.getInstance();
    const productRepository = dataSource.getRepository(Product);
    try {
      const productId = parseInt(req.params.productId, 10);
      if (isNaN(productId)) {
        throw new HttpError('Неверный формат идентификатора продукта', 400);
      }

      const product = await productRepository.findOne({
        where: { id: productId },
      });

      if (product) {
        res.status(200).json(product);
      } else {
        throw new HttpError('Продукт не найден', 404);
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

  static async createProduct(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const dataSource = Database.getInstance();
    const productRepository = dataSource.getRepository(Product);
    const { name, article, description, price, user } = req.body;
    const product = productRepository.create({
      name,
      article,
      description,
      price,
      user,
    });
    try {
      await productRepository.save(product);
      res.status(201).json(product);
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
