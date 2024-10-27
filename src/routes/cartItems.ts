
import { Router } from 'express';
import { CartItemController } from '../controllers/CartItemController';

const CartItemRouter = Router();

CartItemRouter.get('/', CartItemController.getAllCartItems);
CartItemRouter.get('/:cartItemId', CartItemController.getCartItemById);
CartItemRouter.post('/', CartItemController.createCartItem);

export default CartItemRouter;
