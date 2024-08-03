import { Notary } from '../models/notaries.js';
import { Client } from '../models/clients.js';

export const getNotaries = async (req, res) => {
    try {
        const notaries = await Notary.findAll();
        res.status(200).send({ notaries: notaries });
    } catch (err) {
        console.error('Error in getNotaries:', err);
        res.status(500).send({ message: "Eroare de server", err: err });
    }
};

export const getNotaryById = async (req, res) => {
    try {
        const notary = await Notary.findByPk(req.params.notaryId);
        if (notary) {
            res.status(200).send({ notary: notary });
        } else {
            res.status(404).send({ message: "Notarul nu a fost găsit." });
        }
    } catch (err) {
        console.error('Error in getNotaryById:', err);
        res.status(500).send({ message: "Eroare de server", err: err });
    }
};

export const createNotary = async (req, res) => {
    try {
        const notary = req.body;
        await Notary.create(notary);
        res.status(201).send({ message: "Notarul a fost creat" });
    } catch (err) {
        console.error('Error in createNotary:', err);
        res.status(500).send({ message: "Eroare de server", err: err });
    }
};

export const updateNotary = async (req, res) => {
    try {
        const notary = await Notary.findByPk(req.params.notaryId);
        if (notary) {
            const updatedNotary = await notary.update(req.body);
            res.status(200).send({ notary: updatedNotary });
        } else {
            res.status(404).send({ message: "Notarul nu a fost găsit." });
        }
    } catch (err) {
        console.error('Error in updateNotary:', err);
        res.status(500).send({ message: "Eroare de server", err: err });
    }
};

export const deleteNotary = async (req, res) => {
    try {
        const notary = await Notary.findByPk(req.params.notaryId);
        if (notary) {
            await notary.destroy();
            res.status(200).send({ message: "Notarul a fost șters" });
        } else {
            res.status(404).send({ message: "Notarul nu a fost găsit" });
        }
    } catch (err) {
        console.error('Error in deleteNotary:', err);
        res.status(500).send({ message: "Eroare de server", err: err });
    }
};

export const addClientToNotary = async (req, res) => {
    try {
        const notary = await Notary.findByPk(req.params.notaryId);
        const client = await Client.findByPk(req.params.clientId);
        if (notary && client) {
            await notary.addClient(client);
            await notary.save();
            res.status(200).json({message: "Client adăugat", client:client, notary: notary});
        } else {
            res.status(404).json({message: "Clientul/Notarul nu a fost găsit."});
        }
    } catch (err) {
        console.error('Error in addClientToNotary:', err);
        res.status(500).send({message: "Eroare de server", err: err});
    }
};

export const getClientsFromNotary = async (req, res) => {
    try {
        const notary = await Notary.findByPk(req.params.notaryId);
        if (notary) {
            const clients = await notary.getClients();
            res.status(200).json({clients: clients});
        } else {
            res.status(404).json({message: "Notarul nu a fost găsit."});
        }
    } catch (err) {
        console.error('Error in getClientsFromNotary:', err);
        res.status(500).send({message: "Eroare de server", err: err});
    }
};
