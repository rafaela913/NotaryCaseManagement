import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CalculatorPage.css';

const CalculatorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="calculator-page-container">
      <button className="back-button" onClick={() => navigate('/dashboard')}>Înapoi</button>

      <h2>Selectează calculatorul</h2>
      <div className="link-container">
        <Link to="/calculator-notarial-fees">Calculator taxe notariale</Link>
      </div>
      <div className="link-container">
        <Link to="/property-division-calculator">Calculator partaj imobiliar</Link>
      </div>
      <div className="link-container">
        <Link to="/alimony-calculator">Calculator pensie alimentară</Link>
      </div>
    </div>
  );
};

export default CalculatorPage;
