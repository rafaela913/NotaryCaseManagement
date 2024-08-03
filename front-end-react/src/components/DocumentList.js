import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DocumentList.css'; 
import { useNavigate } from 'react-router-dom';

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searched, setSearched] = useState(false); 
  const navigate = useNavigate();

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/documents', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDocuments(response.data.documents || []);
      setSearched(true);
    } catch (error) {
      console.error('Eroare la preluarea documentelor:', error);
      setDocuments([]);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (doc.extractedText && doc.extractedText.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="documents-container">
      <button className="btn btn-back" onClick={() => navigate(-1)}>Înapoi</button>
      <h2>Documente</h2>
      <div className="search-bar-container">
        <input
          className="search-bar"
          type="text"
          placeholder="Caută în documente"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="documents-list">
        {searched && documents.length === 0 ? (
          <p>Niciun document găsit pentru căutarea dvs.</p>
        ) : (
          filteredDocuments.map((doc) => (
            <div key={doc.documentId} className="document-item">
              <h3>{doc.title}</h3>
              <p>{doc.extractedText}</p>
              <a href={`http://localhost:8080${doc.url}`} target="_blank" rel="noopener noreferrer">Vizualizează document</a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DocumentList;
