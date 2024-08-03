import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './GeneratePowerOfAttorney.css';

const GeneratePowerOfAttorney = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    principalName: '',
    agentName: '',
    actionDescription: '',
    documentatia: ''
  });

  const labels = {
    principalName: 'Nume mandant',
    agentName: 'Nume mandatar',
    actionDescription: 'Descriere acțiune',
    documentatia: 'Documentația',
   
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleGeneratePDF = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/pdf/generate-power-of-attorney', formData, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });

      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Procura_Imputernicire_Completata.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="form-page-container">
      <button className="back-button" onClick={() => navigate(-1)}>Înapoi</button>
      <h2>Generare procură împuternicire</h2>
      <form onSubmit={handleGeneratePDF}>
        {Object.keys(formData).map((key) => (
          <div key={key} className="form-group">
            <label htmlFor={key}>{labels[key]}</label>
            <input
              id={key}
              name={key}
              type="text"
              value={formData[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Generare</button>
      </form>
    </div>
  );
};

export default GeneratePowerOfAttorney;
