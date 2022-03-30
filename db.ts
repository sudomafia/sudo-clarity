import { Sequelize, Model, DataTypes } from 'sequelize';
import * as pg from 'pg';

const sequelize = new Sequelize(process.env.CONNECTION_STRING, { dialect: pg })

export class Data extends Model { }

Data.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
    primaryKey: true
  },
  data: DataTypes.STRING(50000),
}, { sequelize, modelName: 'clarity' });

export const waitSync = sequelize.sync();