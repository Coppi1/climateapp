// models/Clima.js
import { DataTypes } from "sequelize";
import { sequelize } from "../utils/mysqlConection.js";

const Clima = sequelize.define(
  "Clima",
  {
    codClima: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dataHora: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    temperature: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    umidade: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    clima: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aqi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    velocidadeVento: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    previsao: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: "clima",
    timestamps: false,
  }
);

export { Clima };
