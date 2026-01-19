import express from 'express';
import { Notary } from '../models/notaries.js';
import { Client } from '../models/clients.js';
import { Case } from '../models/cases.js';
import { Document } from '../models/documents.js';
import { Event } from '../models/events.js';
import exceljs from 'exceljs';
import { authenticateJWT } from '../middlewares/authenticateJWT.js';
import { Sequelize } from 'sequelize';
import { db } from '../config.js';

const router = express.Router();

router.get('/annual-report', authenticateJWT, async (req, res) => {
    try {
        const { year } = req.query;
        const notaryId = req.notaryId;

        if (!notaryId) {
            return res.status(400).send('Notary ID missing');
        }

        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year, 11, 31);

        const caseCount = await Case.count({
            include: [{
                model: Client,
                where: { notaryId }
            }],
            where: {
                createdAt: {
                    [Sequelize.Op.gte]: startDate,
                    [Sequelize.Op.lte]: endDate
                }
            }
        });

        const documentCount = await Document.count({
            include: [{
                model: Case,
                include: [{
                    model: Client,
                    where: { notaryId }
                }]
            }],
            where: {
                createdAt: {
                    [Sequelize.Op.gte]: startDate,
                    [Sequelize.Op.lte]: endDate
                }
            }
        });

        const clientCount = await Client.count({
            where: {
                notaryId,
                createdAt: {
                    [Sequelize.Op.gte]: startDate,
                    [Sequelize.Op.lte]: endDate
                }
            }
        });

        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet('Raport Anual');

        worksheet.columns = [
            { header: 'Indicator', key: 'indicator' },
            { header: 'Valoare', key: 'value' }
        ];

        worksheet.addRow({ indicator: 'Anul', value: year });
        worksheet.addRows([
            { indicator: 'Număr de dosare gestionate', value: caseCount },
            { indicator: 'Număr de documente întocmite', value: documentCount },
            { indicator: 'Număr de clienți adăugați', value: clientCount }
        ]);

        const excelBuffer = await workbook.xlsx.writeBuffer();

        res.setHeader('Content-Disposition', 'attachment; filename=Raport_Anual.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(excelBuffer);

    } catch (error) {
        console.error('Eroare la generarea raportului anual:', error);
        res.status(500).send('Eroare la generarea raportului anual');
    }
});

router.get('/client-case-count', authenticateJWT, async (req, res) => {
    try {
        const notaryId = req.notaryId;
        const limit = parseInt(req.query.limit) || 10; // numărul maxim de clienți de returnat

        if (!notaryId) {
            return res.status(400).send('Notary ID missing');
        }

        const query = `
            SELECT Clients.clientId, Clients.firstname, Clients.lastname, COUNT(Cases.caseId) AS caseCount
            FROM Clients
            LEFT JOIN Cases ON Clients.clientId = Cases.clientId
            WHERE Clients.notaryId = :notaryId
            GROUP BY Clients.clientId, Clients.firstname, Clients.lastname
            ORDER BY caseCount DESC
            LIMIT :limit
        `;

        const clientCaseCounts = await db.query(query, {
            replacements: { notaryId, limit },
            type: db.QueryTypes.SELECT
        });

        if (clientCaseCounts.length === 0) {
            return res.status(404).send('Nu există suficienți clienți pentru a genera acest grafic.');
        }

        res.json(clientCaseCounts);
    } catch (error) {
        console.error('Eroare la obținerea datelor pentru grafic:', error);
        res.status(500).send('Eroare la obținerea datelor pentru grafic');
    }
});

export { router as reportRouter };
