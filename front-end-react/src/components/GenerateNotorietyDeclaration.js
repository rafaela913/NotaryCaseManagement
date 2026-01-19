import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import './GenerateNotorietyDeclaration.css';

const GenerateNotorietyDeclaration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstPersonName: '',
    firstPersonCitizen: '',
    firstPersonBirthDate: '',
    firstPersonBirthPlace: '',
    firstPersonFatherName: '',
    firstPersonMotherName: '',
    firstPersonAddress: '',
    firstPersonStreet: '',
    firstPersonNumber: '',
    firstPersonBlock: '',
    firstPersonStaircase: '',
    firstPersonFloor: '',
    firstPersonApartment: '',
    firstPersonSectorCounty: '',

    secondPersonName: '',
    secondPersonCitizen: '',
    secondPersonBirthDate: '',
    secondPersonBirthPlace: '',
    secondPersonFatherName: '',
    secondPersonMotherName: '',
    secondPersonAddress: '',
    secondPersonStreet: '',
    secondPersonNumber: '',
    secondPersonBlock: '',
    secondPersonStaircase: '',
    secondPersonFloor: '',
    secondPersonApartment: '',
    secondPersonSectorCounty: '',

    knownPersonName: '',
    knownPersonCitizen: '',
    knownPersonAddress: '',
    knownPersonStreet: '',
    knownPersonNumber: '',
    knownPersonBlock: '',
    knownPersonStaircase: '',
    knownPersonFloor: '',
    knownPersonApartment: '',
    knownPersonSectorCounty: '',
    knownPersonFatherName: '',
    knownPersonMotherName: '',
    knownPersonBirthDate: '',
    knownPersonBirthPlace: '',
    knownPersonOtherNames: '',

    purpose: '',
    notaryOfficeName: '',
  });

  const labels = {
    firstPersonName: 'Nume persoană 1',
    firstPersonCitizen: 'Cetățenie persoană 1',
    firstPersonBirthDate: 'Data nașterii persoană 1',
    firstPersonBirthPlace: 'Locul nașterii persoană 1',
    firstPersonFatherName: 'Nume tată persoană 1',
    firstPersonMotherName: 'Nume mamă persoană 1',
    firstPersonAddress: 'Adresa persoană 1',
    firstPersonStreet: 'Strada persoană 1',
    firstPersonNumber: 'Număr persoană 1',
    firstPersonBlock: 'Bloc persoană 1',
    firstPersonStaircase: 'Scară persoană 1',
    firstPersonFloor: 'Etaj persoană 1',
    firstPersonApartment: 'Apartament persoană 1',
    firstPersonSectorCounty: 'Sector/Județ persoană 1',

    secondPersonName: 'Nume persoană 2',
    secondPersonCitizen: 'Cetățenie persoană 2',
    secondPersonBirthDate: 'Data nașterii persoană 2',
    secondPersonBirthPlace: 'Locul nașterii persoană 2',
    secondPersonFatherName: 'Nume tată persoană 2',
    secondPersonMotherName: 'Nume mamă persoană 2',
    secondPersonAddress: 'Adresa persoană 2',
    secondPersonStreet: 'Strada persoană 2',
    secondPersonNumber: 'Număr persoană 2',
    secondPersonBlock: 'Bloc persoană 2',
    secondPersonStaircase: 'Scară persoană 2',
    secondPersonFloor: 'Etaj persoană 2',
    secondPersonApartment: 'Apartament persoană 2',
    secondPersonSectorCounty: 'Sector/Județ persoană 2',

    knownPersonName: 'Nume persoană cunoscută',
    knownPersonCitizen: 'Cetățenie persoană cunoscută',
    knownPersonAddress: 'Adresa persoană cunoscută',
    knownPersonStreet: 'Strada persoană cunoscută',
    knownPersonNumber: 'Număr persoană cunoscută',
    knownPersonBlock: 'Bloc persoană cunoscută',
    knownPersonStaircase: 'Scară persoană cunoscută',
    knownPersonFloor: 'Etaj persoană cunoscută',
    knownPersonApartment: 'Apartament persoană cunoscută',
    knownPersonSectorCounty: 'Sector/Județ persoană cunoscută',
    knownPersonFatherName: 'Nume tată persoană cunoscută',
    knownPersonMotherName: 'Nume mamă persoană cunoscută',
    knownPersonBirthDate: 'Data nașterii persoană cunoscută',
    knownPersonBirthPlace: 'Locul nașterii persoană cunoscută',
    knownPersonOtherNames: 'Alte nume persoană cunoscută',

    purpose: 'Scop',
    notaryOfficeName: 'Nume birou notarial',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGeneratePDF = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/pdf/generate-declaratie-notorietate', formData, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });

      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Declaratie_Notorietate.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Eroare la generarea PDF-ului:', error);
    }
  };

  return (
    <div className="notoriety-page">
      <Sidebar />

      <div className="notoriety-content">
       
        <div className="notoriety-header">
          <button className="header-button" onClick={() => navigate(-1)}>
            Înapoi
          </button>

          <h1>Declarație de notorietate</h1>
        </div>

       
        <div className="notoriety-container">
          <form onSubmit={handleGeneratePDF} className="notoriety-form">
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

export default GenerateNotorietyDeclaration;
