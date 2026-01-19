import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import './GenerateRentalContract.css';

const GenerateRentalContract = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    husbandName: '',
    wifeName: '',
    addressMunicipality: '',
    addressStreet: '',
    addressNumber: '',
    addressCounty: '',
    companyName: '',
    companyMunicipality: '',
    companyStreet: '',
    companyNumber: '',
    companyCounty: '',
    tribunal: '',
    registrationNumber: '',
    representativeName: '',
    representativeMunicipality: '',
    representativeStreet: '',
    representativeNumber: '',
    representativeCounty: '',
    squareMeters: '',
    plot: '',
    parcel: '',
    propertyMunicipality: '',
    propertyStreet: '',
    propertyNumber: '',
    propertyCounty: '',
    rentalStartDate: '',
    rentalEndDate: '',
    constructionAuthorizationNumber: '',
    constructionAuthorizationCityHall: '',
    propertyTitleNumber: '',
    propertyTitleCommission: '',
    monthlyRent: '',
    totalRent: '',
    rentDueDay: '',
    notaryName: '',
  });

  const labels = {
    husbandName: 'Nume soț',
    wifeName: 'Nume soție',
    addressMunicipality: 'Municipiu (adresa soți)',
    addressStreet: 'Stradă (adresa soți)',
    addressNumber: 'Număr (adresa soți)',
    addressCounty: 'Județ (adresa soți)',
    companyName: 'Nume societate',
    companyMunicipality: 'Municipiu (adresa societate)',
    companyStreet: 'Stradă (adresa societate)',
    companyNumber: 'Număr (adresa societate)',
    companyCounty: 'Județ (adresa societate)',
    tribunal: 'Tribunalul',
    registrationNumber: 'Număr înmatriculare',
    representativeName: 'Nume reprezentant',
    representativeMunicipality: 'Municipiu (adresa reprezentant)',
    representativeStreet: 'Stradă (adresa reprezentant)',
    representativeNumber: 'Număr (adresa reprezentant)',
    representativeCounty: 'Județ (adresa reprezentant)',
    squareMeters: 'Nr. m.p.',
    plot: 'Tarlaua',
    parcel: 'Parcela',
    propertyMunicipality: 'Municipiu (adresa proprietate)',
    propertyStreet: 'Stradă (adresa proprietate)',
    propertyNumber: 'Număr (adresa proprietate)',
    propertyCounty: 'Județ (adresa proprietate)',
    rentalStartDate: 'Data începerii închirierii',
    rentalEndDate: 'Data finalizării închirierii',
    constructionAuthorizationNumber: 'Nr. autorizație construire',
    constructionAuthorizationCityHall: 'Primăria autorizației',
    propertyTitleNumber: 'Nr. titlu de proprietate',
    propertyTitleCommission: 'Comisia titlu de proprietate',
    monthlyRent: 'Chiria lunară',
    totalRent: 'Chiria totală',
    rentDueDay: 'Ziua lunii pentru chirie',
    notaryName: 'Nume notar',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGeneratePDF = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/pdf/generate-rental-contract', formData, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });

      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Contract_de_Inchiriere_Spatiu_Comercial.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Eroare la generarea PDF-ului:', error);
    }
  };

  return (
    <div className="generate-rental-page">
      <Sidebar />

      <div className="generate-rental-content">
        <div className="generate-rental-header">
          <button className="header-button" onClick={() => navigate(-1)}>
            Înapoi
          </button>

          <h1>Contract de închiriere spațiu comercial</h1>
        </div>

        <div className="generate-rental-container">
          <form onSubmit={handleGeneratePDF} className="generate-rental-form">
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

            <button type="submit" className="primary-button">
              Generare
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GenerateRentalContract;
