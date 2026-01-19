import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './PropertyDivisionCalculator.css';

const PropertyDivisionCalculator = () => {
  const [propertyValue, setPropertyValue] = useState('');
  const [currency, setCurrency] = useState('RON');
  const [notarialFeePercentage, setNotarialFeePercentage] = useState('');
  const [fee, setFee] = useState(null);
  const [tva, setTva] = useState(null);
  const [total, setTotal] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
        const data = await response.json();
        setExchangeRate(data?.rates?.RON || 1);
      } catch (error) {
        console.error('Eroare la obținerea ratei de schimb:', error);
        setExchangeRate(1);
      }
    };

    if (currency === 'EUR') fetchExchangeRate();
    else setExchangeRate(1);
  }, [currency]);

  const handleCalculate = (e) => {
    e.preventDefault();

    const value = Number(propertyValue);
    const pct = Number(notarialFeePercentage);

    if (!Number.isFinite(value) || value <= 0 || !Number.isFinite(pct) || pct <= 0) {
      alert('Introduceți valori valide pentru bunuri și procentul onorariului!');
      return;
    }

    const valueInRON = currency === 'EUR' ? value * exchangeRate : value;
    const notarialFee = (valueInRON * pct) / 100;
    const calculatedTva = notarialFee * 0.19;
    const totalAmount = notarialFee + calculatedTva;

    setFee(notarialFee);
    setTva(calculatedTva);
    setTotal(totalAmount);
  };

  return (
    <div className="partaj-page">
      <Sidebar />

      <div className="partaj-content">
        <div className="partaj-header">
          <button className="header-button" onClick={() => navigate('/calculator')}>
            Înapoi
          </button>
          <h1>Calculator partaj imobiliar</h1>
        </div>

        <div className="partaj-container">
          <form onSubmit={handleCalculate} className="partaj-form">
            <div className="field">
              <label htmlFor="propertyValue">Valoarea bunurilor</label>

              <div className="value-row">
                <input
                  type="number"
                  id="propertyValue"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(e.target.value)}
                  required
                  min="0"
                  step="1"
                  placeholder="ex: 250000"
                />

                <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                  <option value="RON">Lei (RON)</option>
                  <option value="EUR">Euro (EUR)</option>
                </select>
              </div>

              {currency === 'EUR' && (
                <p className="helper">
                  Curs folosit: 1 EUR = {Number(exchangeRate).toFixed(4)} RON
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="notarialFeePercentage">Procent onorariu notarial (%)</label>
              <input
                type="number"
                id="notarialFeePercentage"
                value={notarialFeePercentage}
                onChange={(e) => setNotarialFeePercentage(e.target.value)}
                required
                min="0"
                step="0.01"
                placeholder="ex: 1.5"
              />
            </div>

            <button type="submit" className="primary-button">
              Calculează
            </button>
          </form>

          {fee !== null && (
            <div className="result-card">
              <h2>Rezultate</h2>

              <div className="result-row">
                <span>Onorariu notarial</span>
                <strong>{fee.toFixed(2)} RON</strong>
              </div>

              <div className="result-row">
                <span>TVA (19%)</span>
                <strong>{tva.toFixed(2)} RON</strong>
              </div>

              <div className="result-row">
                <span>Total</span>
                <strong>{total.toFixed(2)} RON</strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDivisionCalculator;
