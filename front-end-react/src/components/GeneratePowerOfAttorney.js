import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import './GeneratePowerOfAttorney.css';

const GeneratePowerOfAttorney = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    principalName: '',
    agentName: '',
    actionDescription: '',
    documentatia: '',
  });

  const labels = {
    principalName: 'Nume mandant',
    agentName: 'Nume mandatar',
    actionDescription: 'Descriere acțiune',
    documentatia: 'Documentația',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="poa-page">
      <Sidebar />

      <div className="poa-content">
       
        <div className="poa-header">
          <button className="header-button" onClick={() => navigate(-1)}>
            Înapoi
          </button>

          <h1>Procură împuternicire</h1>
        </div>

       
        <div className="poa-container">
          <form onSubmit={handleGeneratePDF} className="poa-form">
            {Object.keys(formData).map((key) => {
              const isLongText = key === 'actionDescription' || key === 'documentatia';

              return (
                <div key={key} className="form-group">
                  <label htmlFor={key}>{labels[key]}</label>

                  {isLongText ? (
                    <textarea
                      id={key}
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      required
                      rows={4}
                    />
                  ) : (
                    <input
                      id={key}
                      name={key}
                      type="text"
                      value={formData[key]}
                      onChange={handleChange}
                      required
                    />
                  )}
                </div>
              );
            })}

            <button type="submit" className="primary-button">
              Generare
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GeneratePowerOfAttorney;
