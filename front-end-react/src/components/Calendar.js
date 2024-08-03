import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', start: null, end: null });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/events', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEvents(response.data);
      } catch (error) {
        console.error('Eroare la preluarea evenimentelor:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({ ...newEvent, start, end });
    setModalIsOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = async () => {
    if (newEvent.title && newEvent.start && newEvent.end) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('/api/events', newEvent, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEvents([...events, response.data]);
        setModalIsOpen(false);
        setNewEvent({ title: '', description: '', start: null, end: null });
      } catch (error) {
        console.error('Eroare la adăugarea evenimentului:', error);
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setDetailsModalIsOpen(true);
  };

  const handleDeleteEvent = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/events/${selectedEvent.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents(events.filter(event => event.id !== selectedEvent.id));
      setDetailsModalIsOpen(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error('Eroare la ștergerea evenimentului:', error);
    }
  };

  return (
    <div className="calendar-container">
      <button className="btn btn-back" onClick={() => navigate(-1)}>Înapoi</button>
      <p> </p>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
      />

      <Modal 
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add Event"
        ariaHideApp={false}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Adaugă eveniment</h2>
        <form>
          <label>
            Titlu: <span className="required">*</span>
            <input
              type="text"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Descriere:
            <textarea
              name="description"
              value={newEvent.description}
              onChange={handleInputChange}
            />
          </label>
          <button type="button" onClick={handleAddEvent}>Adaugă eveniment</button>
          <button type="button" onClick={() => setModalIsOpen(false)}>Renunță</button>
        </form>
      </Modal>

      <Modal 
        isOpen={detailsModalIsOpen}
        onRequestClose={() => setDetailsModalIsOpen(false)}
        contentLabel="Event Details"
        ariaHideApp={false}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Detalii eveniment</h2>
        {selectedEvent && (
          <div>
            <p><strong>Titlu:</strong> {selectedEvent.title}</p>
            <p><strong>Descriere:</strong> {selectedEvent.description}</p>
            <p><strong>Start:</strong> {moment(selectedEvent.start).format('MMMM Do YYYY, h:mm a')}</p>
            <p><strong>End:</strong> {moment(selectedEvent.end).format('MMMM Do YYYY, h:mm a')}</p>
            <button type="button" onClick={handleDeleteEvent}>Șterge eveniment</button>
          </div>
        )}
        <button type="button" onClick={() => setDetailsModalIsOpen(false)}>Închide</button>
      </Modal>
    </div>
  );
};

export default MyCalendar;
