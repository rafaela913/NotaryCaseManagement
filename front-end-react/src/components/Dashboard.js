import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import './Dashboard.css';


const Dashboard = () => {
  const [user, setUser] = useState({ firstname: '', lastname: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token); 
      setUser({ firstname: decodedToken.firstname, lastname: decodedToken.lastname });
    }
  }, []);

  return (
    <div className="dashboard-container">
      <Navbar />
      <Sidebar />
      <div className="dashboard-content">
        <h2>Bun venit, {user.firstname} {user.lastname}</h2>
        <p>Aceasta este o pagină protejată. Doar utilizatorii autentificați pot vedea acest conținut.</p>
      </div>
    </div>
  );
};

export default Dashboard;
