import { Notary } from '../models/notaries.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const notary = await Notary.findOne({ where: { email } });
      if (!notary) {
        return res.status(401).json({ message: 'Autentificare eșuată. Email sau parolă incorecte.' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, notary.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Autentificare eșuată. Email sau parolă incorecte.' });
      }
  
      const token = jwt.sign(
        { notaryId: notary.notaryId, firstname: notary.firstname, lastname: notary.lastname },
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
      );
  
      res.status(200).json({ message: 'Autentificare reușită', token });
    } catch (error) {
      console.error('Server error during login:', error);
      res.status(500).json({ message: 'Eroare de server', error });
    }
  };

export const signup = async (req, res) => {
    const { email, password, firstname, lastname, phoneNumber } = req.body;

    try {
        const existingNotary = await Notary.findOne({ where: { email } });
        if (existingNotary) {
            console.log('Email already in use');
            return res.status(400).json({ message: 'Emailul este deja folosit.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newNotary = await Notary.create({
            notaryId: crypto.randomUUID(),
            email,
            password: hashedPassword,
            firstname,
            lastname,
            phoneNumber
        });

        const token = jwt.sign({ notaryId: newNotary.notaryId, firstname: newNotary.firstname, lastname: newNotary.lastname }, 'secret_key', { expiresIn: '1h' });

        res.status(201).json({ message: 'Înregistrare reușită', token });
    } catch (error) {
        console.error('Server error during signup:', error);
        res.status(500).json({ message: 'Eroare de server', error });
    }
};


