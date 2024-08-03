import React, { useState } from 'react';
import './CalculatorNotarialFees.css';
import { useNavigate } from 'react-router-dom';

const CalculatorNotarialFees = () => {
    const [transactionValue, setTransactionValue] = useState('');
    const [acquisitionMethod, setAcquisitionMethod] = useState('Fara credit');
    const navigate=useNavigate();
    const [fees, setFees] = useState({
        notaryFee: null,
        creditFee: null,
        ocpiFee: null,
        stateTax: null
    });

    const handleCalculate = (e) => {
        e.preventDefault();
        let notaryFee = 0;
        let creditFee = 0;
        let ocpiFee = 0;
        let stateTax = 0;

        
        if (transactionValue <= 15000) {
            notaryFee = Math.max(transactionValue * 0.022, 150);
        } else if (transactionValue <= 30000) {
            notaryFee = 330 + (transactionValue - 15001) * 0.016;
        } else if (transactionValue <= 60000) {
            notaryFee = 580 + (transactionValue - 30001) * 0.013;
        } else if (transactionValue <= 300000) {
            notaryFee = 970 + (transactionValue - 60001) * 0.009;
        } else if (transactionValue <= 600000) {
            notaryFee = 3130 + (transactionValue - 300001) * 0.0065;
        } else {
            notaryFee = 5080 + (transactionValue - 600001) * 0.0044;
        }

       
        if (acquisitionMethod !== 'Fara credit') {
            creditFee = transactionValue * 0.005; 
        }

        ocpiFee = transactionValue * 0.0015; 
        stateTax = transactionValue > 450000 ? (transactionValue - 450000) * 0.03 : 0;

        setFees({
            notaryFee,
            creditFee,
            ocpiFee,
            stateTax
        });
        
    };

    return (
        <div className="calculator-container">
            <button className="back-button" onClick={() => navigate('/calculator')}>Înapoi</button>
            <h1>Calculator taxe notariale</h1>
            <form onSubmit={handleCalculate} className="calculator-form">
                <div className="form-group">
                    <label htmlFor="transactionValue">Valoarea tranzacției (în lei):</label>
                    <input
                        type="number"
                        id="transactionValue"
                        value={transactionValue}
                        onChange={(e) => setTransactionValue(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="acquisitionMethod">Modalitate de dobândire:</label>
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
                <button type="submit">Calculează</button>
            </form>
            {fees.notaryFee !== null && (
                <div className="result">
                    <h2>Rezultate:</h2>
                    <p>Onorariu notarial: {fees.notaryFee.toFixed(2)} lei</p>
                    {acquisitionMethod !== 'Fara credit' && <p>Onorariu pentru autentificarea contractului de credit: {fees.creditFee.toFixed(2)} lei</p>}
                    <p>Taxa către OCPI pentru intabulare: {fees.ocpiFee.toFixed(2)} lei</p>
                    <p>Impozit către stat: {fees.stateTax.toFixed(2)} lei</p>
                </div>
            )}
        </div>
    );
};

export default CalculatorNotarialFees;
