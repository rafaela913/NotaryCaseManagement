import { Client } from '../models/clients.js';
import { getCasesByClientId } from './cases.js';
import { v4 as uuidv4 } from 'uuid';


export const getClients = async (req, res) => {
  try {
    const notaryId = req.notaryId;
    const clients = await Client.findAll({ where: { notaryId } });
    res.status(200).json({ clients });
  } catch (error) {
    console.error('Eroare la preluarea clienților:', error);
    res.status(500).json({ message: 'Eroare de server', error });
  }
};


export const getClientById = async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const client = await Client.findByPk(clientId);
    if (client) {
      res.status(200).json({ client });
    } else {
      res.status(404).json({ message: 'Client nu a fost găsit.' });
    }
  } catch (error) {
    console.error('Eroare la preluarea clientului:', error);
    res.status(500).json({ message: 'Eroare de server', error });
  }
};


export const createClient = async (req, res) => {
  try {
    const { firstname, lastname, email, phoneNumber } = req.body;
    const notaryId = req.notaryId; 

    console.log('Creating client with data:', { firstname, lastname, email, phoneNumber, notaryId });

    const newClient = await Client.create({
      clientId: uuidv4(),
      firstname,
      lastname,
      email,
      phoneNumber,
      notaryId
    });

    res.status(201).json({ message: 'Client creat cu succes', client: newClient });
  } catch (error) {
    console.error('Eroare la crearea clientului:', error);
    res.status(500).json({ message: 'Eroare de server', error });
  }
};


export const updateClient = async (req, res) => {
  try {
    const { clientId } = req.params;
    const { firstname, lastname, email, phoneNumber } = req.body;
    const client = await Client.findByPk(clientId);
    if (!client) {
      return res.status(404).json({ message: 'Clientul nu a fost găsit' });
    }
    client.firstname = firstname;
    client.lastname = lastname;
    client.email = email;
    client.phoneNumber = phoneNumber;
    await client.save();
    res.status(200).json({ message: 'Detaliile clientului au fost actualizate cu succes' });
  } catch (error) {
    res.status(500).json({ message: 'Eroare de server', error });
  }
};


export const deleteClient = async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const client = await Client.findByPk(clientId);

    if (client) {
      await client.destroy();
      res.status(200).json({ message: 'Client șters cu succes' });
    } else {
      res.status(404).json({ message: 'Client nu a fost găsit.' });
    }
  } catch (error) {
    console.error('Eroare la ștergerea clientului:', error);
    res.status(500).json({ message: 'Eroare de server', error });
  }
};

export const getCasesForClient = async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const client = await Client.findByPk(clientId);

    if (!client) {
      return res.status(404).json({ message: 'Clientul nu a fost găsit.' });
    }

    const cases = await getCasesByClientId(clientId);
    res.status(200).json({ cases });
  } catch (error) {
    res.status(500).json({ message: 'Eroare de server', error });
  }
};




