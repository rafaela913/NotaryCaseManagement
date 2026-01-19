import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './SelectPage.css';

const SelectPage = () => {
  const navigate = useNavigate();

  return (
    <div className="select-page">
      <Sidebar />

      <div className="select-content">
        <div className="select-header">
          <button className="header-button" onClick={() => navigate('/dashboard')}>
            Înapoi
          </button>

          <h1>Selectează tipul documentului</h1>
        </div>

        <div className="select-container">
          <ul className="select-list">
            <li className="select-item">
              <Link to="/generate-pdf">Procură generală</Link>
            </li>

            <li className="select-item">
              <Link to="/generate-rental-contract">
                Contract de închiriere spațiu comercial
              </Link>
            </li>

            <li className="select-item">
              <Link to="/generate-declaratie-notorietate">
                Declarație de notorietate
              </Link>
            </li>

            <li className="select-item">
              <Link to="/generate-minor-travel-consent">
                Procură ieșire minor din țară
              </Link>
            </li>

            <li className="select-item">
              <Link to="/generate-power-of-attorney">
                Procură împuternicire
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SelectPage;
