import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './CaseListAll.css';

const CaseListAll = () => {
  const [cases, setCases] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/cases', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCases(response.data.records || []);
      } catch (error) {
        console.error('Eroare la preluarea dosarelor:', error);
      }
    };

    fetchCases();
  }, []);

  const filteredCases = cases
    .filter((c) => {
      const term = searchTerm.toLowerCase();
      const title = (c.title || '').toLowerCase();
      const desc = (c.description || '').toLowerCase();
      const clientName = `${c.Client?.firstname || ''} ${c.Client?.lastname || ''}`.toLowerCase();
      return title.includes(term) || desc.includes(term) || clientName.includes(term);
    })
    .sort((a, b) => {
      const aTitle = (a.title || '').toLowerCase();
      const bTitle = (b.title || '').toLowerCase();
      return sortOrder === 'asc'
        ? aTitle.localeCompare(bTitle)
        : bTitle.localeCompare(aTitle);
    });

  return (
    <div className="cases-page">
      <Sidebar />

      <div className="cases-content">
       
        <div className="cases-page-header">
          <button className="header-button" onClick={() => navigate('/dashboard')}>
            Înapoi
          </button>

          <h1>Lista dosarelor</h1>

          <div /> 
        </div>

        
        <div className="page-controls">
          <input
            type="text"
            placeholder="Caută dosare..."
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

        <ul className="cases-list">
          {filteredCases.length > 0 ? (
            filteredCases.map((c) => (
              <li
                key={c.caseId}
                className="case-item"
                onClick={() => navigate(`/cases/${c.caseId}`)}
              >
                <div className="case-main">
                  <span className="case-title">{c.title}</span>
                  <span className="case-sub">
                    {c.Client?.firstname || ''} {c.Client?.lastname || ''} • {c.status}
                  </span>
                </div>

                <span className="case-arrow">›</span>
              </li>
            ))
          ) : (
            <p className="no-items">Nu s-au găsit dosare</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CaseListAll;
