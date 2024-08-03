import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
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
      const response = await axios.post('/api/cases', 
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
    <div className="add-case-form-container">
      <button className="btn btn-back" onClick={() => navigate(-1)}>Înapoi</button>
      <h2>Adaugă dosar</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Titlu:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="description">Descriere:</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="status">Status:</label>
        <select id="status" name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Prelucrare">Prelucrare</option>
          <option value="Finalizat">Finalizat</option>
        </select>
        <button type="submit">Adaugă dosar</button>
      </form>
      
      <p>{message}</p>
    </div>
  );
};

export default AddCaseForm;
