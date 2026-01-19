import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 
import './GenerateReport.css';

const GenerateReport = () => {
    const [reportData, setReportData] = useState(null);
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const handleGenerateReport = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token); 
            const notaryId = decodedToken.notaryId;

            const response = await axios.get('/api/reports/monthly-report', {
                params: { month, year, notaryId },
                headers: { Authorization: `Bearer ${token}` }
            });
            setReportData(response.data);
        } catch (error) {
            console.error('Eroare la generarea raportului:', error);
        }
    };

    return (
        <div className="generate-report-container">
            <button className="back-button" onClick={() => window.history.back()}>Înapoi</button>
            <h2>Generare Raport Lunar</h2>
            <form onSubmit={handleGenerateReport}>
                <div className="form-group">
                    <label htmlFor="month">Luna</label>
                    <input
                        type="number"
                        id="month"
                        name="month"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit">Generare Raport</button>
            </form>
            {reportData && (
                <div className="report-result">
                    <h3>Rezultate Raport</h3>
                    <p>Număr de dosare gestionate: {reportData.numberOfCases}</p>
                    <p>Număr de documente întocmite: {reportData.numberOfDocuments}</p>
                    <p>Număr de evenimente înregistrate: {reportData.numberOfEvents}</p>
                    
                </div>
            )}
        </div>
    );
};

export default GenerateReport;
