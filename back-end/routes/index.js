import express from 'express';

import {router as notaryRouter} from './notaries.js';
import {router as clientRouter} from './clients.js';
import {router as caseRouter} from './cases.js';
import {router as documentRouter} from './documents.js';
import {router as eventRouter} from './events.js';
import {router as pdfRouter } from './pdf.js'; 

export const router=express.Router();

router.use("/notaries",notaryRouter);
router.use("/clients",clientRouter);
router.use("/cases",caseRouter);
router.use("/documents",documentRouter);
router.use("/events", eventRouter);
router.use("/pdf", pdfRouter); 