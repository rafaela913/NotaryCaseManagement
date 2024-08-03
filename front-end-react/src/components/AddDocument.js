import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './AddDocument.css';

const AddDocument = () => {
  const { caseId } = useParams();
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleAddDocument = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }
      
      const formData = new FormData();
      formData.append('title', title);
      formData.append('file', file);

      await axios.post(`/api/cases/${caseId}/documents`, 
        formData,
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
      );
      setMessage('Document adăugat cu succes');
      navigate(`/cases/${caseId}`);
    } catch (error) {
      if (error.response?.status === 401) {
        // Redirect to login if not authenticated
        navigate('/login');
      } else {
        setMessage(error.response?.data?.message || 'Eroare de server');
      }
      console.error('Eroare la adăugarea documentului:', error);
    }
  };

  return (
    <div className="add-document-form-container">
      <h2>Adaugă Document</h2>
      <form onSubmit={handleAddDocument}>
        <label htmlFor="title">Titlu Document:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="file">Încarcă Document PDF:</label>
        <input
          type="file"
          id="file"
          name="file"
          accept="application/pdf"
          onChange={handleFileChange}
          required
        />
        <button type="submit">Adaugă Document</button>
      </form>
      <p className="message">{message}</p>
    </div>
  );
};

export default AddDocument;
