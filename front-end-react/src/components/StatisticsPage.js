import React, { useState } from 'react';
import ClientCaseChart from './ClientCaseChart';
import { useNavigate } from 'react-router-dom';
import GenerateAnnualReport from './GenerateAnnualReport';
import CaseStatsChart from './CaseStatsChart'; 
import './StatisticsPage.css';

const StatisticsPage = () => {
    const [selectedReport, setSelectedReport] = useState('none');
    const navigate = useNavigate();
    const handleReportChange = (e) => {
        setSelectedReport(e.target.value);
    };

    return (
        <div className="statistics-page-container">
          <button className="back-button" onClick={() => navigate(-1)}>Înapoi</button>
            <h1>Statistici</h1>
            <form className="report-selection-form">
                <label htmlFor="reportType">Alege tipul de date:</label>
                <select id="reportType" value={selectedReport} onChange={handleReportChange}>
                    <option value="none">Selectează un raport</option>
                    <option value="client-case-chart">Grafic: Clienții cu cele mai multe dosare</option>
                    <option value="annual-report">Raport anual</option>
                    <option value="case-status-chart">Grafic: Dosare deschise și închise</option>
                </select>
            </form>
            {selectedReport === 'client-case-chart' && <ClientCaseChart />}
            {selectedReport === 'annual-report' && <GenerateAnnualReport />}
            {selectedReport === 'case-status-chart' && <CaseStatsChart />}
        </div>
    );
};

export default StatisticsPage;
