import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClients(response.data.clients);
      } catch (error) {
        console.error('Eroare la preluarea clienților:', error);
      }
    };

    fetchClients();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredClients = clients
    .filter(client =>
      client.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.lastname.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const nameA = `${a.firstname} ${a.lastname}`.toLowerCase();
      const nameB = `${b.firstname} ${b.lastname}`.toLowerCase();
      if (sortOrder === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleClientClick = (clientId) => {
    navigate(`/clients/${clientId}`);
  };

  return (
    <div className="client-list-container">
      <button className="back-button" onClick={() => navigate('/dashboard')}>Înapoi</button>
      <h2>Lista clienților</h2>
      <input
        type="text"
        placeholder="Caută clienți..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />
      <select value={sortOrder} onChange={handleSortOrderChange} className="sort-dropdown">
        <option value="asc">Sortează crescător</option>
        <option value="desc">Sortează descrescător</option>
      </select>
      <ul>
        {filteredClients.map((client) => (
          <li key={client.clientId} onClick={() => handleClientClick(client.clientId)}>
            {client.firstname} {client.lastname}
          </li>
        ))}
      </ul>
      <button className="add-client-button" onClick={() => navigate('/clients/add')}>Adaugă client</button>
    </div>
  );
};

export default ClientList;
