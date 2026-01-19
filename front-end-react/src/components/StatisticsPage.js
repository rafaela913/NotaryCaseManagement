import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import ClientCaseChart from './ClientCaseChart';
import GenerateAnnualReport from './GenerateAnnualReport';
import CaseStatsChart from './CaseStatsChart';
import './StatisticsPage.css';

const StatisticsPage = () => {
  const [selectedReport, setSelectedReport] = useState('none');
  const navigate = useNavigate();

  return (
    <div className="stats-page">
      <Sidebar />

      <div className="stats-content">
        <div className="stats-header">
          <button className="header-button" onClick={() => navigate(-1)}>
            Înapoi
          </button>
          <h1>Statistici</h1>
        </div>

        <div className="stats-container">
          <form className="stats-form">
            <label htmlFor="reportType">Alege tipul de date</label>
            <select
              id="reportType"
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
            >
              <option value="none">Selectează un raport</option>
              <option value="client-case-chart">
                Clienții cu cele mai multe dosare
              </option>
              <option value="annual-report">Raport anual</option>
              <option value="case-status-chart">
                Dosare deschise vs finalizate
              </option>
            </select>
          </form>

          <div className="stats-result">
            {selectedReport === 'client-case-chart' && <ClientCaseChart />}
            {selectedReport === 'annual-report' && <GenerateAnnualReport />}
            {selectedReport === 'case-status-chart' && <CaseStatsChart />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
