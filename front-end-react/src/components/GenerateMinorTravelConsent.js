// src/components/GenerateMinorTravelConsent.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './GeneratePDF.css';

const GenerateMinorTravelConsent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    parentName: '',
    parentAddress: '',
    parentId: '',
    parentIdSeries: '',
    parentIdNumber: '',
    parentIdIssuer: '',
    parentIdIssueDate: '',
    parentCnp: '',
    minorName: '',
    minorBirthDate: '',
    minorId: '',
    minorIdSeries: '',
    minorIdNumber: '',
    minorCnp: '',
    minorPassportNumber: '',
    minorPassportIssuer: '',
    minorPassportIssueDate: '',
    minorPassportExpiryDate: '',
    accompanyingParentName: '',
    accompanyingParentAddress: '',
    accompanyingParentId: '',
    accompanyingParentIdSeries: '',
    accompanyingParentIdNumber: '',
    accompanyingParentIdIssuer: '',
    accompanyingParentIdIssueDate: '',
    accompanyingParentBirthDate: '',
    accompanyingParentCnp: '',
    notaryName: ''

  });

  const labels = {
    parentName: 'Nume părinte',
    parentAddress: 'Domiciliu părinte',
    parentId: 'Identificator părinte',
    parentIdSeries: 'Seria identificator părinte',
    parentIdNumber: 'Nr identificator părinte',
    parentIdIssuer: 'Eliberator identificator părinte',
    parentIdIssueDate: 'Data eliberării identificator părinte',
    parentCnp: 'CNP părinte',
    minorName: 'Nume minor',
    minorBirthDate: 'Data nașterii minor',
    minorId: 'Identificator minor',
    minorIdSeries: 'Seria identificator minor',
    minorIdNumber: 'Nr identificator minor',
    minorCnp: 'CNP minor',
    minorPassportNumber: 'Nr pașaport minor',
    minorPassportIssuer: 'Eliberator pașaport minor',
    minorPassportIssueDate: 'Data eliberării pașaport minor',
    minorPassportExpiryDate: 'Data limită',
    accompanyingParentName: 'Nume părinte însoțitor',
    accompanyingParentAddress: 'Domiciliu părinte însoțitor',
    accompanyingParentId: 'Identificator părinte însoțitor',
    accompanyingParentIdSeries: 'Seria identificator părinte însoțitor',
    accompanyingParentIdNumber: 'Nr identificator părinte însoțitor',
    accompanyingParentIdIssuer: 'Eliberator identificator părinte însoțitor',
    accompanyingParentIdIssueDate: 'Data eliberării identificator părinte însoțitor',
    accompanyingParentBirthDate: 'Data nașterii părinte însoțitor',
    accompanyingParentCnp: 'CNP părinte însoțitor',
    notaryName: 'Nume notar'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleGeneratePDF = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/pdf/generate-minor-travel-consent', formData, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });

      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Procura_Iesire_Minor_Din_Tara.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Eroare la generarea PDF-ului:', error);
    }
  };

  return (
    <div className="form-page-container">
      <button className="back-button" onClick={() => navigate(-1)}>Înapoi</button>
      <h2>Generare procură ieșire minor din țară</h2>
      <form onSubmit={handleGeneratePDF}>
        {Object.keys(formData).map((key) => (
          <div key={key} className="form-group">
            <label htmlFor={key}>{labels[key]}</label>
            <input
              id={key}
              name={key}
              type={key.includes('Date') ? 'date' : 'text'}
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

export default GenerateMinorTravelConsent;
