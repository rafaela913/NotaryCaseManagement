import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './CalculatorPage.css';

const CalculatorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="calculator-page">
      <Sidebar />

      <div className="calculator-content">
        <div className="calculator-header">
          <button className="header-button" onClick={() => navigate('/dashboard')}>
            Înapoi
          </button>
          <h1>Calculatoare</h1>
        </div>

        <div className="calculator-container">
          <div className="calculator-links">
            <Link to="/calculator-notarial-fees" className="calculator-card">
              Calculator taxe notariale
            </Link>

            <Link to="/property-division-calculator" className="calculator-card">
              Calculator partaj imobiliar
            </Link>

            <Link to="/alimony-calculator" className="calculator-card">
              Calculator pensie alimentară
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;
