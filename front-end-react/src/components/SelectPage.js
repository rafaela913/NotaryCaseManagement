import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './SelectPage.css';

const SelectPage = () => {
  const navigate = useNavigate();
  return (
    <div className="select-page-container">
      <button className="back-button" onClick={() => navigate('/dashboard')}>Înapoi</button>

      <h2>Selectează tipul documentului</h2>
      <div className="link-container">
        <Link to="/generate-pdf">Procură generală</Link>
      </div>
      <div className="link-container">
        <Link to="/generate-rental-contract">Contract de închiriere spațiu comercial</Link>
      </div>
      <div className="link-container">
        <Link to="/generate-declaratie-notorietate">Declarație de notorietate</Link>
      </div>
      <div className="link-container">
        <Link to="/generate-minor-travel-consent">Procură ieșire minor din țară</Link>
      </div>
      <div className="link-container">
        <Link to="/generate-power-of-attorney">Procură împuternicire</Link>
      </div>
    </div>
  );
};

export default SelectPage;
