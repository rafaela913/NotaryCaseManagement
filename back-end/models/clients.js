import { DataTypes } from 'sequelize';
import { db } from '../config.js';
import { v4 as uuidv4 } from 'uuid';

export const Client = db.define('Client', {
  clientId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  notaryId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Notaries',
      key: 'notaryId'
    }
  }
}, {
  indexes: [
    {
      unique: true,
      fields: ['email', 'phoneNumber']
    }
  ]
});
