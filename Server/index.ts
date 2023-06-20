import express, { Express } from 'express';
// Cors
import cors from "cors";

// Sequelize
import { sequelize } from "./database";

// Main Route
import mainRouter from "./routes";


const port = process.env.PORT || 3000;

const app: Express = express();

app.use(cors());

app.use(express.json());


app.use('/api', mainRouter);

sequelize.sync({ force: false }).then(() => {
    console.log('Database connected and tables synced');
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})