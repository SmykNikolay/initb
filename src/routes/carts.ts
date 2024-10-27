import { Router } from 'express';
import { CartController } from '../controllers/CartController';

const CartRouter = Router();

CartRouter.get('/:userId', CartController.getCartByUserId);
CartRouter.post('/add', CartController.addItemToCart);
CartRouter.post('/remove', CartController.removeItemFromCart);

export default CartRouter;
