import { Router } from "express";

// Controller
import * as fromAuthControllers from "../../controllers/auth";

const authRoutes: Router = Router();

authRoutes.post('/login', fromAuthControllers.loginUser);

export { authRoutes };