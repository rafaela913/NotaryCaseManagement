import { Case } from "../models/cases.js";
import { Client } from '../models/clients.js';
import {v4 as uuidv4} from 'uuid';
import Sequelize from 'sequelize';


const getCases = async (req, res) => {
    
    try {
      const notaryId = req.notaryId; 
  
      const cases = await Case.findAll({
        include: {
          model: Client,
          attributes: ['firstname', 'lastname'],
          where: { notaryId } 
        }
      });
  
      res.status(200).send({ records: cases });
    } catch (error) {
      res.status(500).send({ message: "Eroare de server", error });
    }
    };


const getCaseById = async (req, res) => {
    try {
        const caseInstance = await Case.findByPk(req.params.caseId, {
          include: {
            model: Client,
            attributes: ['firstname', 'lastname', 'email', 'phoneNumber']

          }
        });
        if (caseInstance) {
          res.status(200).send({ case: caseInstance });
        } else {
          res.status(404).send({ message: "Dosar nu a fost găsit." });
        }
      } catch (error) {
        res.status(500).send({ message: "Eroare de server", error });
      }
    };


const createCase = async (req, res) => {
    try {
      const { clientId, title, description, status } = req.body;
      console.log('Creating case with data:', { clientId, title, description, status });
      
      if (!clientId || !title || !status) {
        console.error('Missing required fields');
        return res.status(400).send({ message: 'Missing required fields' });
      }
  
      const newCase = await Case.create({
        caseId: uuidv4(),
        clientId,
        title,
        description,
        status,
        openingDate: new Date()
      });
  
      res.status(201).send({ message: 'Case created successfully', case: newCase });
    } catch (error) {
      console.error('Server error during case creation:', error);
      res.status(500).send({ message: 'Server error', error });
    }
   
  };
  


  const updateCase = async (req, res) => {
    try {
      const caseInstance = await Case.findByPk(req.params.caseId);
      if (caseInstance) {
        const { status, observations } = req.body;
  
        let completionDate = caseInstance.completionDate;
        if (status === 'Finalizat') {
          completionDate = new Date();
        }
  
        await caseInstance.update({ ...req.body, completionDate, observations });
        res.status(200).send({ message: "Case updated successfully", case: caseInstance });
      } else {
        res.status(404).send({ message: "Case not found." });
      }
    } catch (error) {
      res.status(500).send({ message: "Server error", error: error });
    }
  };


const deleteCase = async (req, res) => {
    try {
        const caseInstance = await Case.findByPk(req.params.caseId);
        if (caseInstance) {
            await caseInstance.destroy();
            res.status(200).send({ message: "Case deleted successfully" });
        } else {
            res.status(404).send({ message: "Case not found." });
        }
    } catch (error) {
        res.status(500).send({ message: "Server error", error: error });
    }
};


const addDocumentToCase = async (req, res) => {
    try {
        const caseInstance = await Case.findByPk(req.params.caseId);
        const document = await Document.findByPk(req.params.documentId);
        if (caseInstance && document) {
            caseInstance.addDocument(document);
            await caseInstance.save();
            res.status(200).json({message: "added document to case", case:caseInstance, document: document});
        } else {
            res.status(404).json({message: "document/case not found."});
        }
    } catch(err) {
        res.status(500).send({message: "server error", err: err})
    }
};

const getDocumentsFromCase = async (req, res) => {
    try {
        const caseInstance = await Case.findByPk(req.params.caseId);
        if (caseInstance) {
            const documents = await caseInstance.getDocuments();
            res.status(200).json({documents: documents});
        } else {
            res.status(404).json({message: "case not found."});
        }
    } catch(err) {
        res.status(500).send({message: "server error", err: err});
    }
};

const getCasesByClientId = async (clientId) => {
    try {
      const cases = await Case.findAll({
        where: { clientId },
        include: {
          model: Client,
          attributes: ['firstname', 'lastname']
        }
      });
      return cases;
    } catch (error) {
      throw new Error('Eroare la preluarea dosarelor.');
    }
};

const getCaseStatsByMonth = async (req, res) => {
  const { month, year } = req.query;

  try {
      const casesOpened = await Case.count({
          where: Sequelize.where(
              Sequelize.fn('strftime', '%m-%Y', Sequelize.col('openingDate')),
              `${month.padStart(2, '0')}-${year}`
          )
      });

      const casesClosed = await Case.count({
          where: Sequelize.where(
              Sequelize.fn('strftime', '%m-%Y', Sequelize.col('completionDate')),
              `${month.padStart(2, '0')}-${year}`
          )
      });

      console.log(`Număr dosare deschise în ${month}-${year}: ${casesOpened}`);
      console.log(`Număr dosare închise în ${month}-${year}: ${casesClosed}`);

      res.status(200).json({ casesOpened, casesClosed });
  } catch (error) {
      console.error('Eroare la obținerea statisticilor despre dosare:', error);
      res.status(500).json({ message: 'Eroare la obținerea statisticilor despre dosare.', error });
  }
};

export { 
    getCases, 
    getCaseById,
    createCase, 
    updateCase, 
    deleteCase,
    addDocumentToCase,
    getDocumentsFromCase,
    getCasesByClientId,
    getCaseStatsByMonth
 };

