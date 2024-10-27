import { Router } from 'express';
import { OrderItemController } from '../controllers/OrderItemController';

const OrderItemRouter = Router();

OrderItemRouter.get('/', OrderItemController.getAllOrderItems);
OrderItemRouter.get('/:orderItemId', OrderItemController.getOrderItemById);
OrderItemRouter.post('/', OrderItemController.createOrderItem);

export default OrderItemRouter;
