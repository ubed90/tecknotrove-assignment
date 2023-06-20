"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// App Routes
const auth_1 = require("./auth");
const user_1 = require("./user");
const appRouter = (0, express_1.Router)();
appRouter.use('/auth', auth_1.authRoutes);
appRouter.use('/user', user_1.userRoutes);
exports.default = appRouter;
