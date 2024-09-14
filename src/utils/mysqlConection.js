import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("db_climateapp", "root", "1234", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});
