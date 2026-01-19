import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { router as indexRouter } from './routes/index.js';
import { router as authRouter } from './routes/auth.js';
import { router as eventRouter } from './routes/events.js';
import {router as documentRouter} from './routes/documents.js'; 
import {router as pdfRouter} from './routes/pdf.js';
import { router as transactionRouter } from './routes/transactions.js';
import { authenticateJWT } from './middlewares/authenticateJWT.js'; 
import { synchronizeDatabase } from './config.js';  
import { Notary } from './models/notaries.js';
import { Client } from './models/clients.js';
import { Case } from './models/cases.js';
import { Document } from './models/documents.js';
import { Event } from './models/events.js';
import { reportRouter } from './routes/report.js';
import { notificationsRouter } from './routes/notifications.js';
import { Transaction } from './models/transaction.js';


const PORT = 8080;

// Set up relationships
Notary.hasMany(Client, { foreignKey: 'notaryId' });
Client.belongsTo(Notary, { foreignKey: 'notaryId' });
Case.belongsTo(Client, { foreignKey: 'clientId' });
Client.hasMany(Case, { foreignKey: 'clientId' });
Case.hasMany(Document, { foreignKey: 'caseId' });
Document.belongsTo(Case, { foreignKey: 'caseId' });
Notary.hasMany(Event, { foreignKey: 'notaryId' });
Event.belongsTo(Notary, { foreignKey: 'notaryId' });

Document.hasMany(Transaction, { foreignKey: 'documentId' });
Transaction.belongsTo(Document, { foreignKey: 'documentId' });

const app = express();
app.use(express.json());
app.use(cors());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, '../front-end-react/build')));

// API routes
app.use('/auth', authRouter);
app.use('/api', authenticateJWT, indexRouter); 
app.use('/templates', express.static(path.join(__dirname, 'templates')));
app.use('/api/documents', authenticateJWT, documentRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/events', eventRouter);
app.use('/api/pdf', pdfRouter);
app.use('/api/reports', reportRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/transactions', authenticateJWT, transactionRouter);

// Catchall handler
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../front-end-react/build/index.html'));
});

const server = app.listen(PORT, async () => {
    try {
        await synchronizeDatabase();
        await Notary.sync({ force: false });
        await Client.sync({ force: false });
        await Case.sync({ force: false });
        await Document.sync({ force: false });
        await Event.sync({force: false});
        await Transaction.sync({ force: false });
        console.log(`Server started on http://localhost:${PORT}`);
    } catch (err) {
        console.log("There was an error with the database connection", err);
        server.close();
    }
});

