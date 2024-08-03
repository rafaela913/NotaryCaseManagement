// src/components/Notifications.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/notifications', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error('Eroare la preluarea notificărilor:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="notifications-container">
      <button className="btn btn-back" onClick={handleBackClick}>Înapoi</button>
      <h2>Notificări</h2>
      {notifications.length === 0 ? (
        <p>Nu există notificări.</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>
              <p><strong>Eveniment:</strong> {notification.title}</p>
              <p><strong>Data:</strong> {new Date(notification.date).toLocaleDateString()}</p>
              <p><strong>Descriere:</strong> {notification.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
