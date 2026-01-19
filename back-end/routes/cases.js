import express from 'express';
import * as caseController from '../controllers/cases.js';
import { Case } from '../models/cases.js';  
import { Document } from '../models/documents.js'; 
import { authenticateJWT } from '../middlewares/authenticateJWT.js';

export const router = express.Router();

router.use(authenticateJWT);

router.get('/', caseController.getCases);
// router.get('/:caseId', caseController.getCaseById);
router.post('/', caseController.createCase);
router.put('/:caseId', caseController.updateCase);
router.delete('/:caseId', caseController.deleteCase);

router.get('/:caseId/documents', caseController.getDocumentsFromCase);
router.post('/:caseId/documents/:documentId', caseController.addDocumentToCase);
router.get('/stats/by-month', caseController.getCaseStatsByMonth);


router.get('/:caseId', authenticateJWT, async (req, res) => {
    try {
      const caseDetails = await Case.findByPk(req.params.caseId, {
        include: [Document]
      });
  
      if (caseDetails) {
        res.status(200).json({ case: caseDetails });
      } else {
        res.status(404).json({ message: 'Case not found' });
      }
    } catch (error) {
      console.error('Error fetching case details:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  });

  router.get('/stats/opened-per-month', authenticateJWT, async (req, res) => {
    try {
      const cases = await Case.findAll({
        attributes: [
          [Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('createdAt')), 'month'],
          [Sequelize.fn('COUNT', Sequelize.col('id')), 'caseCount']
        ],
        group: ['month'],
        order: [['month', 'ASC']]
      });
  
      res.json(cases);
    } catch (error) {
      console.error('Eroare la obținerea dosarelor pe lună:', error);
      res.status(500).json({ error: 'Eroare de server' });
    }
  });

  