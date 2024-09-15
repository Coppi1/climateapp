import { DataTypes } from "sequelize";
import { sequelize } from "../utils/mysqlConection.js";

const User = sequelize.define("User", {
  codUser: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codCidade: {
    type: DataTypes.INTEGER,
  },
  dataHoraCadastro: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export { User };
