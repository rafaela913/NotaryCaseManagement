import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditCase.css';

const EditCase = () => {
  const { caseId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [observations, setObservations] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/cases/${caseId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const caseData = response.data.case;
        setTitle(caseData.title);
        setDescription(caseData.description);
        setStatus(caseData.status);
        setObservations(caseData.observations || '');
      } catch (error) {
        console.error('Eroare la preluarea detaliilor dosarului:', error);
      }
    };

    fetchCaseDetails();
  }, [caseId]);

  const handleUpdateCase = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/cases/${caseId}`, 
        { title, description, status, observations },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Dosar actualizat cu succes');
      navigate(`/cases/${caseId}`);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Eroare de server');
      console.error('Eroare la actualizarea dosarului:', error);
    }
  };

  return (
    <div className="edit-case-form-container">
      <button className="btn btn-back" onClick={() => navigate(-1)}>Înapoi</button>
      <h2>Actualizează dosar</h2>
      <form onSubmit={handleUpdateCase}>
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
        <label htmlFor="observations">Observații:</label>
        <textarea
          id="observations"
          name="observations"
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
        />
        <button type="submit">Actualizează dosar</button>
      </form>
      <p className="message">{message}</p>
    </div>
  );
};

export default EditCase;
