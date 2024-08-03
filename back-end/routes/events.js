import express from 'express';
import { authenticateJWT } from '../middlewares/authenticateJWT.js';
import { getEvents, createEvent, deleteEvent } from '../controllers/events.js';

export const router = express.Router();
router.use(authenticateJWT);

router.get('/', getEvents);
router.post('/', createEvent);
router.delete('/:eventId', deleteEvent);



