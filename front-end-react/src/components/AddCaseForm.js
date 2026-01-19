import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import './AddCaseForm.css';

const AddCaseForm = () => {
  const { clientId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Prelucrare');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/cases',
        { clientId, title, description, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        setMessage('Dosar adăugat cu succes');
        navigate(`/clients/${clientId}`);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Eroare de server');
    }
  };

  return (
    <div className="add-case-page">
      <Sidebar />

      <div className="add-case-content">
        
        <div className="add-case-header">
          <button className="header-button" onClick={() => navigate(-1)}>
            Înapoi
          </button>

          <h1>Adaugă dosar</h1>

          <div /> 
        </div>

        <div className="add-case-container">
          <form onSubmit={handleSubmit} className="add-case-form">
            <label htmlFor="title">Titlu</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label htmlFor="description">Descriere</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
            />

            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Prelucrare">Prelucrare</option>
              <option value="Finalizat">Finalizat</option>
            </select>

            <button type="submit" className="primary-button">
              Adaugă dosar
            </button>

            {message && <p className="form-message">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCaseForm;
