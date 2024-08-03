import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './CaseStatsChart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const CaseStatsChart = () => {
    const [data, setData] = useState(null);
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/api/cases/stats/by-month', {
                    params: { month, year },
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (!response.data) {
                    setError('Nu există suficiente date pentru a genera graficul.');
                } else {
                    setData(response.data);
                }
            } catch (error) {
                console.error('Eroare la obținerea datelor pentru grafic:', error);
                setError('Eroare la obținerea datelor pentru grafic.');
            }
        };

        fetchData();
    }, [month, year]);

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    };

    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    const chartData = {
        labels: ['Dosare deschise', 'Dosare închise'],
        datasets: [{
            data: [data.casesOpened, data.casesClosed],
            backgroundColor: ['#36A2EB', '#FF6384']
        }]
    };

    return (
        <div className="case-stats-chart-container">
            <h2>Statistici dosare pentru luna selectată</h2>
            <form>
                <div className="date-selection-container">
                    <label htmlFor="month">Luna:</label>
                    <input 
                        type="number" 
                        id="month" 
                        value={month} 
                        onChange={handleMonthChange} 
                        min="1" 
                        max="12" 
                    />
                    <label htmlFor="year">Anul:</label>
                    <input 
                        type="number" 
                        id="year" 
                        value={year} 
                        onChange={handleYearChange} 
                        min="2000" 
                    />
                </div>
            </form>
            <Pie data={chartData} />
        </div>
    );
};

export default CaseStatsChart;
