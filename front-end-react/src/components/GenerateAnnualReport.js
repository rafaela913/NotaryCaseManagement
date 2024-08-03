import React, { useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; 
import './GenerateAnnualReport.css';

const GenerateAnnualReport = () => {
  const [year, setYear] = useState('');

  const handleGenerateReport = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token missing');
      }
      const decodedToken = jwtDecode(token); 

      const notaryId = decodedToken.notaryId;
      if (!notaryId) {
        throw new Error('Notary ID missing in token');
      }

      const response = await axios.get('/api/reports/annual-report', {
        params: { year },
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });

      const excelBlob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(excelBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Raport_Anual.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Eroare la generarea raportului anual:', error);
    }
  };

  return (
    <div className="generate-annual-report-container">
      <h2>Generare raport anual</h2>
      <form onSubmit={handleGenerateReport}>
        <div className="form-group">
          <label htmlFor="year">Anul</label>
          <input
            type="number"
            id="year"
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <button className="btn-Raport" type="submit">Generare Raport</button>
      </form>
    </div>
  );
};

export default GenerateAnnualReport;
