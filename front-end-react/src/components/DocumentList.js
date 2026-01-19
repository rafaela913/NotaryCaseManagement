import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './DocumentList.css';

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/documents', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDocuments(response.data.documents || []);
      setSearched(true);
    } catch (error) {
      console.error('Eroare la preluarea documentelor:', error);
      setDocuments([]);
      setSearched(true);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const filteredDocuments = documents.filter((doc) => {
    const q = searchQuery.toLowerCase();
    const title = (doc.title || '').toLowerCase();
    const text = (doc.extractedText || '').toLowerCase();
    return title.includes(q) || text.includes(q);
  });

  return (
    <div className="documents-page">
      <Sidebar />

      <div className="documents-content">
        <div className="documents-header">
          <button className="header-button" onClick={() => navigate(-1)}>
            Înapoi
          </button>

          <h1>Documente</h1>

          <div /> 
        </div>

        <div className="page-controls">
          <input
            className="search-bar"
            type="text"
            placeholder="Caută în documente..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <ul className="documents-list">
          {searched && documents.length === 0 ? (
            <p className="no-items">Nu există documente.</p>
          ) : filteredDocuments.length === 0 ? (
            <p className="no-items">Niciun document găsit pentru căutarea dvs.</p>
          ) : (
            filteredDocuments.map((doc) => (
              <li key={doc.documentId} className="document-item">
                <div className="document-top">
                  <h2 className="document-title">{doc.title}</h2>
                </div>

                {doc.extractedText ? (
                  <p className="document-text">
                    {doc.extractedText.length > 300
                      ? doc.extractedText.slice(0, 300) + '...'
                      : doc.extractedText}
                  </p>
                ) : (
                  <p className="document-text empty-text">Fără text extras.</p>
                )}

                <a
                  className="document-link"
                  href={`http://localhost:8080${doc.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vizualizează document
                </a>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default DocumentList;
