import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CaseDocuments.css';

const CaseDocuments = () => {
  const { caseId } = useParams();
  const [documents, setDocuments] = useState([]); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/documents/${caseId}/documents`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDocuments(response.data.documents || []); 
      } catch (error) {
        setError(error.response?.data?.message || 'Eroare de server');
      }
    };

    fetchDocuments();
  }, [caseId]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="case-documents-container">
      <h2>Documente pentru Dosarul {caseId}</h2>
      {documents.length === 0 ? (
        <p>Nu există documente pentru acest dosar.</p>
      ) : (
        <ul>
          {documents.map((doc) => (
            <li key={doc.id}>
              <a href={doc.url} target="_blank" rel="noopener noreferrer">{doc.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CaseDocuments;
