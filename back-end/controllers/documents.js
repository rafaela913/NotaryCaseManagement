import fs from 'fs';
import { Document } from "../models/documents.js";
import { Transaction } from '../models/transaction.js';
import { generateDocumentHash } from '../utils/hashing.js';

const createTransaction = async (type, documentId, hash) => {
  try {
    const latestTransaction = await Transaction.findOne({ 
        where: { documentId }, 
        order: [['timestamp', 'DESC']] 
    });
    const previousHash = latestTransaction ? latestTransaction.hash : null;
    await Transaction.create({
        type,
        documentId,
        hash,
        previousHash,
        timestamp: new Date()
    });
} catch (error) {
    console.error('Error in createTransaction:', error);
}
};

export const getDocumentTransactions = async (req, res) => {
  try {
    const { documentId } = req.params;
    const transactions = await Transaction.findAll({ where: { documentId }, order: [['timestamp', 'ASC']] });
    if (transactions) {
      res.status(200).json({ transactions });
    } else {
      res.status(404).json({ message: 'Tranzacții nu au fost găsite pentru documentul specificat.' });
    }
  } catch (error) {
    console.error('Eroare la preluarea tranzacțiilor:', error);
    res.status(500).json({ message: 'Eroare de server', error });
  }
};

export const getAllDocumentTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({ 
      include: {
        model: Document,
        attributes: ['title']
      },
      order: [['timestamp', 'ASC']] 
    });
    console.log('All Transactions:', transactions);
    if (transactions) {
      res.status(200).json({ transactions });
    } else {
      res.status(404).json({ message: 'Nu au fost găsite tranzacții.' });
    }
  } catch (error) {
    console.error('Eroare la preluarea tranzacțiilor:', error);
    res.status(500).json({ message: 'Eroare de server', error });
  }
};

export const verifyDocumentTransactions = async (req, res) => {
  try {
    const { documentId } = req.params;
    const transactions = await Transaction.findAll({ where: { documentId }, order: [['timestamp', 'ASC']] });
    
    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ message: 'Tranzacții nu au fost găsite pentru documentul specificat.' });
    }

    let isValid = true;
    for (let i = 0; i < transactions.length; i++) {
      const transaction = transactions[i];
      if (i > 0) {
        const previousTransaction = transactions[i - 1];
        if (transaction.previousHash !== previousTransaction.hash) {
          isValid = false;
          break;
        }
      }
    }

    res.status(200).json({ isValid, transactions });
  } catch (error) {
    console.error('Eroare la verificarea integrității tranzacțiilor:', error);
    res.status(500).json({ message: 'Eroare de server', error });
  }
};

export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.findAll();
    res.status(200).send({ documents: documents });
  } catch (error) {
    console.error('Error in getDocuments:', error);
    res.status(500).send({ message: "Eroare de server", error: error });
  }
};


export const getDocumentById = async (req, res) => {
  try {
    const document = await Document.findByPk(req.params.documentId);
    if (document) {
      res.status(200).send({ document: document });
    } else {
      res.status(404).send({ message: "Documentul nu a fost găsit." });
    }
  } catch (error) {
    console.error('Error in getDocumentById:', error);
    res.status(500).send({ message: "Eroare de server", error: error });
  }
};

export const createDocument = async (req, res) => {
  try {
      const { title, caseId, extractedText } = req.body;
      const fileUrl = `/uploads/${req.file.filename}`;
      
  
      const fileContent = await fs.promises.readFile(req.file.path, 'utf8');
      const documentHash = generateDocumentHash(fileContent);
      
      const newDocument = await Document.create({
          title: title || req.file.originalname,
          url: fileUrl,
          caseId,
          issuanceDate: new Date(),
          extractedText
      });

      
      await createTransaction('upload', newDocument.documentId, documentHash);

      res.status(201).json({ message: 'Document încărcat cu succes', document: newDocument });
  } catch (error) {
      console.error('Eroare la încărcarea documentului:', error);
      res.status(500).json({ message: 'Eroare de server', error });
  }
};


export const updateDocument = async (req, res) => {
  try {
      const document = await Document.findByPk(req.params.documentId);
      if (document) {
          await document.update(req.body);

  
          const fileContent = await fs.promises.readFile(req.file.path, 'utf8');
          const documentHash = generateDocumentHash(fileContent);
          
          
          await createTransaction('update', document.documentId, documentHash);

          res.status(200).send({ message: "Document actualizat cu succes" });
      } else {
          res.status(404).send({ message: "Documentul nu a fost găsit." });
      }
  } catch (error) {
      console.error('Error in updateDocument:', error);
      res.status(500).send({ message: "Eroare de server", error: error });
  }
};


export const deleteDocument = async (req, res) => {
  try {
      const document = await Document.findByPk(req.params.documentId);
      if (document) {
          
          const documentHash = generateDocumentHash(document.documentId);

         
          await createTransaction('delete', document.documentId, documentHash);

          
          await document.update({ isDeleted: true });

          res.status(200).send({ message: "Document marcat ca șters cu succes" });
      } else {
          res.status(404).send({ message: "Documentul nu a fost găsit." });
      }
  } catch (error) {
      console.error('Error in deleteDocument:', error);
      res.status(500).send({ message: "Eroare de server", error: error });
  }
};


export const searchDocuments = async (req, res) => {
  try {
    const { query } = req.query;
    console.log('Search query:', query); 

    const documents = await Document.findAll({
      where: {
        extractedText: {
          [Sequelize.Op.like]: `%${query}%`
        }
      }
    });

    console.log('Found documents:', documents); 

    res.status(200).json({ documents });
  } catch (error) {
    console.error('Eroare la căutarea documentelor:', error);
    res.status(500).json({ message: 'Eroare de server', error });
  }
};



