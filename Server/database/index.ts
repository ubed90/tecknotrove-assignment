import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USERNAME as string, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
});

export { sequelize };