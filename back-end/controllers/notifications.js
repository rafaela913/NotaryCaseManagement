// controllers/notifications.js
import { Event } from '../models/events.js';
import { Op } from 'sequelize';

export const getNotifications = async (req, res) => {
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const notifications = await Event.findAll({
      where: {
        date: {
          [Op.eq]: tomorrow.toISOString().split('T')[0]
        }
      }
    });

    res.status(200).json({ notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Eroare de server', error });
  }
};
