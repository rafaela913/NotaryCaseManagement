import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
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
      if (!token) throw new Error('User not authenticated');

      const formData = new FormData();
      formData.append('title', title);
      formData.append('file', file);

      await axios.post(
        `/api/cases/${caseId}/documents`,
        formData,
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
      );

      setMessage('Document adăugat cu succes');
      navigate(`/cases/${caseId}`);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        setMessage(error.response?.data?.message || 'Eroare de server');
      }
      console.error('Eroare la adăugarea documentului:', error);
    }
  };

  return (
    <div className="add-document-page">
      <Sidebar />

      <div className="add-document-content">
        {/* HEADER */}
        <div className="add-document-header">
          <button className="header-button" onClick={() => navigate(-1)}>
            Înapoi
          </button>

          <h1>Adaugă document</h1>

          <div /> {/* spacer */}
        </div>

        {/* CONTAINER ALB */}
        <div className="add-document-container">
          <form onSubmit={handleAddDocument} className="add-document-form">
            <label htmlFor="title">Titlu document</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label htmlFor="file">Încarcă document (PDF)</label>
            <input
              type="file"
              id="file"
              name="file"
              accept="application/pdf"
              onChange={handleFileChange}
              required
            />

            <button type="submit" className="primary-button">
              Adaugă document
            </button>

            {message && <p className="form-message">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDocument;
