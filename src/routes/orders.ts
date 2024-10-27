import { Router } from 'express';
import { OrderController } from '../controllers/OrderController';

const OrderRouter = Router();

OrderRouter.get('/:userId', OrderController.getOrdersByUserId);
OrderRouter.post('/', OrderController.createOrder);

export default OrderRouter;
