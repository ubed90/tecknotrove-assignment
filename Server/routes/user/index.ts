import { Router } from "express";

// Controller
import * as fromUserControllers from "../../controllers/user";

// MiddleWare
import * as fromAuthMiddleware from '../../middlewares/auth'

const userRoutes: Router = Router();

userRoutes.post('/register-user', fromUserControllers.registerUser);

userRoutes.get('/get-users', fromAuthMiddleware.authenticateToken , fromUserControllers.getUsers)

export { userRoutes };