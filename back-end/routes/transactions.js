import express from 'express';
import { authenticateJWT } from '../middlewares/authenticateJWT.js';
import { getDocumentTransactions, verifyDocumentTransactions,getAllDocumentTransactions } from '../controllers/documents.js';

const router = express.Router();

router.use(authenticateJWT);

router.get('/:documentId/transactions', getDocumentTransactions);
router.get('/:documentId/verify', verifyDocumentTransactions);
router.get('/all', getAllDocumentTransactions);

export { router };
