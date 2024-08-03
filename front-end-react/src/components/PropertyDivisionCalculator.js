import React, { useState, useEffect } from 'react';
import './PropertyDivisionCalculator.css';
import { useNavigate } from 'react-router-dom';

const PropertyDivisionCalculator = () => {
    const [propertyValue, setPropertyValue] = useState('');
    const [currency, setCurrency] = useState('RON');
    const [notarialFeePercentage, setNotarialFeePercentage] = useState('');
    const [fee, setFee] = useState(null);
    const [tva, setTva] = useState(null);
    const [total, setTotal] = useState(null);
    const [exchangeRate, setExchangeRate] = useState(1);
    const navigate=useNavigate();

    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                const response = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
                const data = await response.json();
                setExchangeRate(data.rates.RON);
            } catch (error) {
                console.error('Eroare la obținerea ratei de schimb:', error);
            }
        };

        if (currency === 'EUR') {
            fetchExchangeRate();
        } else {
            setExchangeRate(1);
        }
    }, [currency]);

    const handleCalculate = (e) => {
        e.preventDefault();
        const value = parseFloat(propertyValue);

        if (isNaN(value) || value <= 0 || isNaN(parseFloat(notarialFeePercentage)) || parseFloat(notarialFeePercentage) <= 0) {
            alert('Introduceți valori valide pentru bunuri și procentul onorariului!');
            return;
        }

        const valueInRON = currency === 'EUR' ? value * exchangeRate : value;
        const notarialFee = (valueInRON * parseFloat(notarialFeePercentage)) / 100;
        const calculatedTva = notarialFee * 0.19;
        const totalAmount = notarialFee + calculatedTva;

        setFee(notarialFee);
        setTva(calculatedTva);
        setTotal(totalAmount);
    };

    return (
        <div className="calculator-container">
             <button className="back-button" onClick={() => navigate('/calculator')}>Înapoi</button>
            <h1>Calculator partaj imobiliar</h1>
            <form onSubmit={handleCalculate} className="calculator-form">
                <div className="form-group">
                    <label htmlFor="propertyValue">Valoarea bunurilor:</label>
                    <input
                        type="number"
                        id="propertyValue"
                        value={propertyValue}
                        onChange={(e) => setPropertyValue(e.target.value)}
                        required
                    />
                    <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                        <option value="RON">Lei (RON)</option>
                        <option value="EUR">Euro (EUR)</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="notarialFeePercentage">Procent Onorariu Notarial (%):</label>
                    <input
                        type="number"
                        id="notarialFeePercentage"
                        value={notarialFeePercentage}
                        onChange={(e) => setNotarialFeePercentage(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Calculează</button>
            </form>
            {fee !== null && (
                <div className="result">
                    <h2>Rezultate:</h2>
                    <p>Onorariu Notarial: {fee.toFixed(2)} RON</p>
                    <p>TVA (19%): {tva.toFixed(2)} RON</p>
                    <p>Total: {total.toFixed(2)} RON</p>
                </div>
            )}
        </div>
    );
};

export default PropertyDivisionCalculator;
