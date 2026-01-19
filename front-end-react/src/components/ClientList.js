import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './ClientList.css';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/clients', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClients(response.data.clients || []);
      } catch (error) {
        console.error('Eroare la preluarea clienților:', error);
      }
    };

    fetchClients();
  }, []);

  const filteredClients = clients
    .filter(client =>
      `${client.firstname} ${client.lastname}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const nameA = `${a.firstname} ${a.lastname}`.toLowerCase();
      const nameB = `${b.firstname} ${b.lastname}`.toLowerCase();
      return sortOrder === 'asc'
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });

  return (
    <div className="client-page">
      <Sidebar />

      <div className="client-content">
        
        <div className="clients-page-header">
          <button
            className="header-button"
            onClick={() => navigate('/dashboard')}
          >
            Înapoi
          </button>

          <h1>Lista clienților</h1>

          <button
            className="header-button"
            onClick={() => navigate('/clients/add')}
          >
            Adaugă client
          </button>
        </div>

       
        <div className="page-controls">
          <input
            type="text"
            placeholder="Caută clienți..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="sort-dropdown"
          >
            <option value="asc">Sortează crescător</option>
            <option value="desc">Sortează descrescător</option>
          </select>
        </div>

     
        <ul className="clients-list">
          {filteredClients.length > 0 ? (
            filteredClients.map(client => (
              <li
                key={client.clientId}
                className="client-item"
                onClick={() => navigate(`/clients/${client.clientId}`)}
              >
                <span className="client-name">
                  {client.firstname} {client.lastname}
                </span>
                <span className="client-arrow">›</span>
              </li>
            ))
          ) : (
            <p className="no-clients">Nu s-au găsit clienți</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ClientList;
