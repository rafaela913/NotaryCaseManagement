import React, { useState } from 'react';
import axios from 'axios';
import './SearchDocuments.css';

const SearchDocuments = () => {
  const [query, setQuery] = useState('');
  const [documents, setDocuments] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/documents/search', {
        params: { query },
        headers: { Authorization: `Bearer ${token}` }
      });
      setDocuments(response.data.documents);
    } catch (error) {
      console.error('Eroare la căutarea documentelor:', error);
    }
  };

  return (
    <div className="search-documents-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Caută documente"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Caută</button>
      </form>
      <ul>
        {documents.map((doc) => (
          <li key={doc.documentId}>
            <h4>{doc.title}</h4>
            <p>{doc.extractedText}</p>
            <a href={`http://localhost:8080${doc.url}`} target="_blank" rel="noopener noreferrer">Vizualizează document</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchDocuments;
