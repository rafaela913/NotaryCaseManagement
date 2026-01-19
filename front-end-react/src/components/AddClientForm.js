import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './AddClientForm.css';

const AddClientForm = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/clients',
        { firstname, lastname, email, phoneNumber },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        setMessage('Client adăugat cu succes');
        navigate('/clients');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Eroare de server');
    }
  };

  return (
    <div className="add-client-page">
      <Sidebar />

      <div className="add-client-content">
        
        <div className="add-client-header">
          <button className="header-button" onClick={() => navigate('/clients')}>
            Înapoi
          </button>

          <h1>Adaugă client</h1>

          <div /> 
        </div>

        
        <div className="add-client-container">
          <form onSubmit={handleSubmit} className="add-client-form">
            <label htmlFor="firstname">Prenume</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />

            <label htmlFor="lastname">Nume</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="phoneNumber">Număr de telefon</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />

            <button type="submit" className="primary-button">
              Adaugă
            </button>

            {message && <p className="form-message">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClientForm;
