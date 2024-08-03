import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './GeneratePDF.css';

const GeneratePDF = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clientName: '',
    birthDate: '',
    birthPlace: '',
    address: '',
    idInfo: '',
    cnp: '',
    representativeName: '',
    representativeBirthDate: '',
    representativeBirthPlace: '',
    representativeAddress: '',
    representativeInfo: '',
    representativeCnp: '',
    purpose: '',
    issueDate: '',
    docName: '',
    numberOfCopies: '',
    copiesHandedToParties: ''
  });

  const labels = {
    clientName: 'Nume client',
    birthDate: 'Data nașterii',
    birthPlace: 'Locul nașterii',
    address: 'Domiciliu',
    idInfo: 'Informații act identitate',
    cnp: 'CNP',
    representativeName: 'Nume reprezentant',
    representativeBirthDate: 'Data nașterii reprezentant',
    representativeBirthPlace: 'Locul nașterii reprezentant',
    representativeAddress: 'Domiciliu reprezentant',
    representativeInfo: 'Informații act identitate reprezentant',
    representativeCnp: 'CNP reprezentant',
    purpose: 'Scop',
    issueDate: 'Data emiterii',
    docName: 'Nume document',
    numberOfCopies: 'Număr copii',
    copiesHandedToParties: 'Copii înmânate părților'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleGeneratePDF = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/pdf/generate', formData, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });

      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Anexa_22_Procura_generala_completata.pdf';
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
      <h2>Generare procură generală</h2>
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

export default GeneratePDF;
