import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';

const ProductRouter = Router();

ProductRouter.get('/', ProductController.getAllProducts);
ProductRouter.get('/:productId', ProductController.getProductById);
ProductRouter.post('/', ProductController.createProduct);

export default ProductRouter;
