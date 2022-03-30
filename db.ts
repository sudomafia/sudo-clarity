import { Sequelize, Model, DataTypes } from 'sequelize';
const sequelize = new Sequelize(process.env.CONNECTION_STRING)

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