import { Cart } from './models/Cart';
import { CartItem } from './models/CartItem';
import { Order } from './models/Order';
import { OrderItem } from './models/OrderItem';
import { Product } from './models/Product';
import { User } from './models/User';

import { DataSource, Repository, ObjectLiteral } from 'typeorm';

class DatabaseSingleton {
  private static _instance: DatabaseSingleton;
  private _dataSource: DataSource;

  private constructor() {
    this._dataSource = new DataSource({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [User, Cart, CartItem, Order, OrderItem, Product],
      synchronize: false, // Отключаем авто-синхронизацию
    });
  }

  public static getInstance(): DatabaseSingleton {
    if (!DatabaseSingleton._instance) {
      DatabaseSingleton._instance = new DatabaseSingleton();
    }
    return DatabaseSingleton._instance;
  }

  public initialize(): Promise<DataSource> {
    return this._dataSource.initialize();
  }

  public synchronize(drop?: boolean): Promise<void> {
    return this._dataSource.synchronize(drop);
  }

  public destroy(): Promise<void> {
    return this._dataSource.destroy();
  }

  public getRepository<Entity extends ObjectLiteral>(
    entity: new () => Entity,
  ): Repository<Entity> {
    return this._dataSource.getRepository(entity);
  }
}

export default DatabaseSingleton;
