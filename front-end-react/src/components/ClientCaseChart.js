import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './ClientCaseChart.css';


ChartJS.register(ArcElement, Tooltip, Legend);

const ClientCaseChart = ({ onBack }) => {
    const [data, setData] = useState(null);
    const [limit, setLimit] = useState(10);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/api/reports/client-case-count', {
                    params: { limit },
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data.length === 0) {
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
    }, [limit]);

    const handleLimitChange = (e) => {
        setLimit(e.target.value);
    };

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    const chartData = {
        labels: data.map(client => `${client.firstname} ${client.lastname}`),
        datasets: [{
            data: data.map(client => client.caseCount),
            backgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', 
                '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'
            ],
        }]
    };

    return (
        <div className="client-case-chart-container">
            <h2>Clienții cu cele mai multe dosare</h2>
            <form>
                <div className="limit-container">
                    <label htmlFor="limit">Alege numărul de clienți:</label>
                    <input 
                        type="number" 
                        id="limit" 
                        value={limit} 
                        onChange={handleLimitChange} 
                        min="1" 
                    />
                </div>
            </form>
            <Pie data={chartData} />
        </div>
    );
};

export default ClientCaseChart;
