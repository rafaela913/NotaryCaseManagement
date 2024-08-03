import express from 'express';
import multer from 'multer';
import { Document } from '../models/documents.js';
import { authenticateJWT } from '../middlewares/authenticateJWT.js'; 
import { Sequelize } from 'sequelize';
import * as documentController from '../controllers/documents.js';


const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.use(authenticateJWT);

router.post('/upload', upload.single('file'), documentController.createDocument);
router.get('/:documentId', documentController.getDocumentById);
router.put('/:documentId', upload.single('file'), documentController.updateDocument);
router.delete('/:documentId', documentController.deleteDocument);
// router.get('/search', documentController.searchDocuments);
router.get('/', documentController.getDocuments);


router.get('/search', authenticateJWT, async (req, res) => {
  try {
    const { query } = req.query;
    const documents = await Document.findAll({
      where: {
        extractedText: {
          [Sequelize.Op.like]: `%${query}%`
        }
      }
    });

    res.status(200).json({ documents });
  } catch (error) {
    console.error('Eroare la căutarea documentelor:', error);
    res.status(500).json({ message: 'Eroare de server', error });
  }
});

router.get('/:documentId', authenticateJWT, async (req, res) => {
  try {
    const document = await Document.findByPk(req.params.documentId);
    if (document) {
      res.status(200).json({ document });
    } else {
      res.status(404).json({ message: 'Documentul nu a fost găsit' });
    }
  } catch (error) {
    console.error('Eroare la preluarea documentului:', error);
    res.status(500).json({ message: 'Eroare de server', error });
  }
});





export { router };
