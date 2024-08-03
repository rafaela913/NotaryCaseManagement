import React, { useState } from 'react';
import './AlimonyCalculator.css';
import { useNavigate } from 'react-router-dom';

const AlimonyCalculator = () => {
    const [monthlyIncome, setMonthlyIncome] = useState('');
    const [numChildren, setNumChildren] = useState(1);
    const [alimony, setAlimony] = useState(null);
    const navigate=useNavigate();

    const handleCalculate = (e) => {
        e.preventDefault();

        const income = parseFloat(monthlyIncome);
        if (isNaN(income) || income <= 0) {
            alert('Introduceți un venit net lunar valid!');
            return;
        }

        let percentage = 0;

        if (numChildren === 1) {
            percentage = 0.25;
        } else if (numChildren === 2) {
            percentage = 0.33;
        } else if (numChildren >= 3) {
            percentage = 0.50;
        }

        const totalAlimony = income * percentage;

        setAlimony(totalAlimony);
    };

    return (
        <div className="calculator-container">
             <button className="back-buttonal" onClick={() => navigate('/calculator')}>Înapoi</button>
            <h1>Calculator pensie alimentară</h1>
            <form onSubmit={handleCalculate} className="calculator-form">
                <div className="form-group">
                    <label htmlFor="monthlyIncome">Venitul net lunar al plătitorului:</label>
                    <input
                        type="number"
                        id="monthlyIncome"
                        value={monthlyIncome}
                        onChange={(e) => setMonthlyIncome(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="numChildren">Numărul de copii:</label>
                    <input
                        type="number"
                        id="numChildren"
                        value={numChildren}
                        onChange={(e) => setNumChildren(parseInt(e.target.value))}
                        min="1"
                        required
                    />
                </div>
                <button type="submit">Calculează</button>
            </form>
            {alimony !== null && (
                <div className="result">
                    <h2>Pensie alimentară: {alimony.toFixed(2)} RON</h2>
                </div>
            )}
        </div>
    );
};

export default AlimonyCalculator;
