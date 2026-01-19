import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './AlimonyCalculator.css';

const AlimonyCalculator = () => {
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [numChildren, setNumChildren] = useState(1);
  const [alimony, setAlimony] = useState(null);
  const navigate = useNavigate();

  const handleCalculate = (e) => {
    e.preventDefault();

    const income = Number(monthlyIncome);
    const children = Number(numChildren);

    if (!Number.isFinite(income) || income <= 0) {
      alert('Introduceți un venit net lunar valid!');
      return;
    }

    if (!Number.isFinite(children) || children < 1) {
      alert('Introduceți un număr valid de copii!');
      return;
    }

    let percentage = 0;

    if (children === 1) percentage = 0.25;
    else if (children === 2) percentage = 0.33;
    else percentage = 0.5;

    setAlimony(income * percentage);
  };

  return (
    <div className="alimony-page">
      <Sidebar />

      <div className="alimony-content">
        <div className="alimony-header">
          <button className="header-button" onClick={() => navigate('/calculator')}>
            Înapoi
          </button>
          <h1>Calculator pensie alimentară</h1>
        </div>

        <div className="alimony-container">
          <form onSubmit={handleCalculate} className="alimony-form">
            <div className="field">
              <label htmlFor="monthlyIncome">Venitul net lunar al plătitorului (RON)</label>
              <input
                type="number"
                id="monthlyIncome"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                required
                min="0"
                step="1"
                placeholder="ex: 4500"
              />
            </div>

            <div className="field">
              <label htmlFor="numChildren">Numărul de copii</label>
              <input
                type="number"
                id="numChildren"
                value={numChildren}
                onChange={(e) => setNumChildren(parseInt(e.target.value || '1', 10))}
                min="1"
                step="1"
                required
              />
            </div>

            <button type="submit" className="primary-button">
              Calculează
            </button>
          </form>

          {alimony !== null && (
            <div className="result-card">
              <h2>Pensie alimentară estimată</h2>
              <div className="result-row">
                <span>Total</span>
                <strong>{alimony.toFixed(2)} RON</strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlimonyCalculator;
