import express from 'express';
import { authenticateJWT } from '../middlewares/authenticateJWT.js';
import {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getCasesForClient
} from '../controllers/clients.js';
import { createCase } from '../controllers/cases.js'; 

const router = express.Router();

router.use(authenticateJWT);

router.get('/', getClients);
router.get('/:clientId', getClientById);
router.post('/', createClient);
router.put('/:clientId', updateClient);
router.delete('/:clientId', deleteClient);
router.get('/:clientId/cases', getCasesForClient); 
router.post('/:clientId/cases', createCase); 

export { router };
