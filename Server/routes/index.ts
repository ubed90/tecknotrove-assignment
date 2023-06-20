import { Router } from "express";

// App Routes
import { authRoutes } from "./auth";
import { userRoutes } from "./user";

const appRouter: Router = Router();


appRouter.use('/auth', authRoutes);
appRouter.use('/user', userRoutes);

export default appRouter;



