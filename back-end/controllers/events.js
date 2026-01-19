import { Event } from '../models/events.js';


export const getEvents = async (req, res) => {
  try {
    const events = await Event.findAll({ where: { notaryId: req.notaryId } });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Eroare la preluarea evenimentelor', error });
  }
};


export const createEvent = async (req, res) => {
  try {
    const { title, description, start, end } = req.body;
    const newEvent = await Event.create({ title, description, start, end, notaryId: req.notaryId });
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Eroare la adăugarea evenimentului', error });
  }
};


export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findOne({ where: { id: eventId, notaryId: req.notaryId } });
    if (event) {
      await event.destroy();
      res.status(200).json({ message: 'Eveniment șters cu succes' });
    } else {
      res.status(404).json({ message: 'Evenimentul nu a fost găsit' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Eroare la ștergerea evenimentului', error });
  }
};
