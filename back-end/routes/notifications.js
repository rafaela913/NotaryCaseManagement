// routes/notifications.js
import express from 'express';
import { getNotifications } from '../controllers/notifications.js';
import { authenticateJWT } from '../middlewares/authenticateJWT.js';

const router = express.Router();

router.get('/', authenticateJWT, getNotifications);

export { router as notificationsRouter };
