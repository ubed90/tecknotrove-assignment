"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Cors
const cors_1 = __importDefault(require("cors"));
// Sequelize
const database_1 = require("./database");
// Main Route
const routes_1 = __importDefault(require("./routes"));
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', routes_1.default);
database_1.sequelize.sync({ force: false }).then(() => {
    console.log('Database connected and tables synced');
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
