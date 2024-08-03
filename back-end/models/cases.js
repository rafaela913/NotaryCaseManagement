import { DataTypes } from 'sequelize';
import { db } from '../config.js';
import { Client } from './clients.js';
import { Document } from './documents.js';

const Status = {
  PRELUCRARE: 'Prelucrare',
  FINALIZAT: 'Finalizat'
};

export const Case = db.define('Case', {
  caseId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  clientId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Clients',
      key: 'clientId'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('Prelucrare', 'Finalizat'),
    allowNull: false
  },
  archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  openingDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  completionDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  observations: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

