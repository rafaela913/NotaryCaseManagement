import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/notifications', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(response.data.notifications || []);
      } catch (error) {
        console.error('Eroare la preluarea notificărilor:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="notifications-page">
      <Sidebar />

      <div className="notifications-content">
        <div className="notifications-header">
          <button className="header-button" onClick={() => navigate(-1)}>
            Înapoi
          </button>

          <h1>Notificări</h1>
        </div>

        <div className="notifications-container">
          {notifications.length === 0 ? (
            <p className="no-items">Nu există notificări.</p>
          ) : (
            <ul className="notifications-list">
              {notifications.map((notification) => (
                <li key={notification.id} className="notification-item">
                  <p>
                    <strong>Eveniment:</strong> {notification.title}
                  </p>
                  <p>
                    <strong>Data:</strong>{' '}
                    {new Date(notification.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Descriere:</strong> {notification.description}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
