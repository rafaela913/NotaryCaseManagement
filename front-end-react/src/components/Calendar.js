import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Calendar.css';

const localizer = momentLocalizer(moment);

Modal.setAppElement('#root');

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    start: null,
    end: null,
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/events', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(response.data || []);
      } catch (error) {
        console.error('Eroare la preluarea evenimentelor:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleSelectSlot = ({ start, end }) => {
    setNewEvent((prev) => ({ ...prev, start, end }));
    setModalIsOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEvent = async () => {
    if (!newEvent.title || !newEvent.start || !newEvent.end) return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/events', newEvent, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEvents((prev) => [...prev, response.data]);
      setModalIsOpen(false);
      setNewEvent({ title: '', description: '', start: null, end: null });
    } catch (error) {
      console.error('Eroare la adăugarea evenimentului:', error);
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setDetailsModalIsOpen(true);
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/events/${selectedEvent.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEvents((prev) => prev.filter((ev) => ev.id !== selectedEvent.id));
      setDetailsModalIsOpen(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error('Eroare la ștergerea evenimentului:', error);
    }
  };

  return (
    <div className="calendar-page">
      <Sidebar />

      <div className="calendar-content">
        <div className="calendar-header">
          <button className="header-button" onClick={() => navigate(-1)}>
            Înapoi
          </button>

          <h1>Calendar</h1>

          <div /> 
        </div>

        <div className="calendar-container">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            style={{ height: 650 }}
          />
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Add Event"
          className="custom-modal"
          overlayClassName="custom-overlay"
        >
          <h2 className="modal-title">Adaugă eveniment</h2>

          <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
            <label>
              Titlu <span className="required">*</span>
              <input
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
                className="modal-input"
              />
            </label>

            <label>
              Descriere
              <textarea
                name="description"
                value={newEvent.description}
                onChange={handleInputChange}
                className="modal-textarea"
                rows={4}
              />
            </label>

            <div className="modal-actions">
              <button type="button" className="primary-button" onClick={handleAddEvent}>
                Adaugă eveniment
              </button>

              <button type="button" className="secondary-button" onClick={() => setModalIsOpen(false)}>
                Renunță
              </button>
            </div>
          </form>
        </Modal>

        <Modal
          isOpen={detailsModalIsOpen}
          onRequestClose={() => setDetailsModalIsOpen(false)}
          contentLabel="Event Details"
          className="custom-modal"
          overlayClassName="custom-overlay"
        >
          <h2 className="modal-title">Detalii eveniment</h2>

          {selectedEvent && (
            <div className="modal-details">
              <p><strong>Titlu:</strong> {selectedEvent.title}</p>
              <p><strong>Descriere:</strong> {selectedEvent.description}</p>
              <p><strong>Start:</strong> {moment(selectedEvent.start).format('MMMM Do YYYY, h:mm a')}</p>
              <p><strong>End:</strong> {moment(selectedEvent.end).format('MMMM Do YYYY, h:mm a')}</p>

              <div className="modal-actions">
                <button type="button" className="primary-button" onClick={handleDeleteEvent}>
                  Șterge eveniment
                </button>

                <button type="button" className="secondary-button" onClick={() => setDetailsModalIsOpen(false)}>
                  Închide
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default MyCalendar;
