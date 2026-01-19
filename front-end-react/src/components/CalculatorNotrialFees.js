import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './CalculatorNotarialFees.css';

const CalculatorNotarialFees = () => {
  const [transactionValue, setTransactionValue] = useState('');
  const [acquisitionMethod, setAcquisitionMethod] = useState('Fara credit');
  const navigate = useNavigate();

  const [fees, setFees] = useState({
    notaryFee: null,
    creditFee: null,
    ocpiFee: null,
    stateTax: null,
  });

  const handleCalculate = (e) => {
    e.preventDefault();

    const value = Number(transactionValue);
    if (!Number.isFinite(value) || value <= 0) return;

    let notaryFee = 0;
    let creditFee = 0;
    let ocpiFee = 0;
    let stateTax = 0;

    if (value <= 15000) {
      notaryFee = Math.max(value * 0.022, 150);
    } else if (value <= 30000) {
      notaryFee = 330 + (value - 15001) * 0.016;
    } else if (value <= 60000) {
      notaryFee = 580 + (value - 30001) * 0.013;
    } else if (value <= 300000) {
      notaryFee = 970 + (value - 60001) * 0.009;
    } else if (value <= 600000) {
      notaryFee = 3130 + (value - 300001) * 0.0065;
    } else {
      notaryFee = 5080 + (value - 600001) * 0.0044;
    }

    if (acquisitionMethod !== 'Fara credit') {
      creditFee = value * 0.005;
    }

    ocpiFee = value * 0.0015;
    stateTax = value > 450000 ? (value - 450000) * 0.03 : 0;

    setFees({ notaryFee, creditFee, ocpiFee, stateTax });
  };

  return (
    <div className="notarial-page">
      <Sidebar />

      <div className="notarial-content">
        {/* HEADER */}
        <div className="notarial-header">
          <button className="header-button" onClick={() => navigate('/calculator')}>
            Înapoi
          </button>
          <h1>Calculator taxe notariale</h1>
        </div>

        {/* CONTAINER */}
        <div className="notarial-container">
          <form onSubmit={handleCalculate} className="notarial-form">
            <div className="field">
              <label htmlFor="transactionValue">Valoarea tranzacției (lei)</label>
              <input
                type="number"
                id="transactionValue"
                value={transactionValue}
                onChange={(e) => setTransactionValue(e.target.value)}
                required
                min="0"
                step="1"
                placeholder="ex: 250000"
              />
            </div>

            <div className="field">
              <label htmlFor="acquisitionMethod">Modalitate de dobândire</label>
              <select
                id="acquisitionMethod"
                value={acquisitionMethod}
                onChange={(e) => setAcquisitionMethod(e.target.value)}
                required
              >
                <option value="Fara credit">Fără credit</option>
                <option value="Cu credit">Cu credit</option>
              </select>
            </div>

            <button type="submit" className="primary-button">
              Calculează
            </button>
          </form>

          {fees.notaryFee !== null && (
            <div className="result-card">
              <h2>Rezultate</h2>

              <div className="result-row">
                <span>Onorariu notarial</span>
                <strong>{fees.notaryFee.toFixed(2)} lei</strong>
              </div>

              {acquisitionMethod !== 'Fara credit' && (
                <div className="result-row">
                  <span>Onorariu autentificare contract credit</span>
                  <strong>{fees.creditFee.toFixed(2)} lei</strong>
                </div>
              )}

              <div className="result-row">
                <span>Taxa OCPI intabulare</span>
                <strong>{fees.ocpiFee.toFixed(2)} lei</strong>
              </div>

              <div className="result-row">
                <span>Impozit către stat</span>
                <strong>{fees.stateTax.toFixed(2)} lei</strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalculatorNotarialFees;
