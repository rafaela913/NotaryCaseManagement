import nodemailer from 'nodemailer';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const db = new Sequelize({
    dialect: 'sqlite',
    storage: 'storage.db',
    logging: console.log
});

export const synchronizeDatabase = async () => {
    try {
        await db.authenticate();
        console.log('Conexiunea a fost stabilită cu succes.');
        await db.sync({ force: false }); // Adaugă { alter: true } pentru a forța sincronizarea
        console.log('Baza de date a fost sincronizată.');
    } catch (error) {
        console.error('Nu s-a putut conecta la baza de date:', error);
    }
};



