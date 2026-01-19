import { DataTypes } from 'sequelize';
import { db } from '../config.js';

export const Document = db.define('Document', {
    documentId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    issuanceDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    caseId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    extractedText: {
        type: DataTypes.TEXT,
        allowNull: true
    } ,
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});
