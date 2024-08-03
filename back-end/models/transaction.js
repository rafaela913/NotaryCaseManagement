// src/models/transaction.js
import { DataTypes } from 'sequelize';
import { db } from '../config.js';

export const Transaction = db.define('Transaction', {
  transactionId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  documentId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  previousHash: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

