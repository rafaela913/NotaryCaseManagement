import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const CasesChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get('/api/cases/stats/opened-per-month');
        const data = response.data;

        const months = data.map(item => new Date(item.month).toLocaleString('default', { month: 'long' }));
        const caseCounts = data.map(item => item.caseCount);

        setChartData({
          labels: months,
          datasets: [
            {
              label: 'Număr de dosare deschise',
              data: caseCounts,
              backgroundColor: 'rgba(75,192,192,0.6)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1
            }
          ]
        });
      } catch (error) {
        console.error('Eroare la preluarea datelor pentru grafic:', error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div>
      <h2>Numărul de dosare deschise pe lună</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default CasesChart;
