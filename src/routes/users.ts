import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const UserRouter = Router();

UserRouter.get('/', UserController.getAllUsers);
UserRouter.get('/:userId', UserController.getUserById);
UserRouter.post('/', UserController.createUser);

export default UserRouter;
