import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CaseListAll.css';
import { useNavigate } from 'react-router-dom';

const CaseListAll = () => {
  const [cases, setCases] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' pentru crescător, 'desc' pentru descrescător
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/cases', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCases(response.data.records);
      } catch (error) {
        console.error('Eroare la preluarea dosarelor:', error);
      }
    };

    fetchCases();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCases = cases
    .filter(c =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (sortOrder === 'asc') {
        return titleA.localeCompare(titleB);
      } else {
        return titleB.localeCompare(titleA);
      }
    });

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleCaseClick = (caseId) => {
    navigate(`/cases/${caseId}`);
  };

  return (
    <div className="case-list-all-container">
      <button className="back-button" onClick={() => navigate('/dashboard')}>Înapoi</button>
      <h2>Lista dosarelor</h2>
      <input
        type="text"
        placeholder="Caută dosare..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />
      <select value={sortOrder} onChange={handleSortOrderChange} className="sort-dropdown">
        <option value="asc">Sortează crescător</option>
        <option value="desc">Sortează descrescător</option>
      </select>
      <p> </p>
      <ul>
        {filteredCases.map((c) => (
          <li key={c.caseId} onClick={() => handleCaseClick(c.caseId)}>
            <h3>{c.title}</h3>
            <p>{c.description}</p>
            <p>Status: {c.status}</p>
            <p>Client: {c.Client.firstname} {c.Client.lastname}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CaseListAll;
