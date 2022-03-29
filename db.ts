import { Sequelize, Model, DataTypes } from 'sequelize';
const sequelize = new Sequelize('sqlite:data.db');


export class Data extends Model { }

Data.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  data: DataTypes.STRING,
}, { sequelize, modelName: 'data' });

export const waitSync = sequelize.sync();