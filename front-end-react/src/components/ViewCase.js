import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ViewCase.css';

const ViewCase = () => {
  const { caseId } = useParams();
  const [caseDetails, setCaseDetails] = useState(null);
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/cases/${caseId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const caseData = response.data.case;
        setCaseDetails(caseData);
        setDocuments(caseData.Documents || []);
      } catch (error) {
        console.error('Eroare la preluarea detaliilor dosarului:', error);
      }
    };

    fetchCaseDetails();
  }, [caseId]);

  const handleEditClick = () => {
    navigate(`/cases/${caseId}/edit`);
  };

  const handleAddDocumentClick = () => {
    navigate(`/cases/${caseId}/add-document`);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleDeleteDocument = async (documentId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/documents/${documentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDocuments(documents.filter(doc => doc.documentId !== documentId));
    } catch (error) {
      console.error('Eroare la ștergerea documentului:', error);
    }
  };

  if (!caseDetails) {
    return <p>Încărcare...</p>;
  }

  const { title, description, status, openingDate, observations } = caseDetails;

  return (
    <div className="view-case-container">
      <button className="btn btn-back" onClick={handleBackClick}>Înapoi</button>
      <h2>Detaliile dosarului</h2>
      <p><strong>Titlu:</strong> {title}</p>
      <p><strong>Descriere:</strong> {description}</p>
      <p><strong>Status:</strong> {status}</p>
      <p><strong>Data deschiderii:</strong> {new Date(openingDate).toLocaleDateString()}</p>
      <button className="btn btn-primary" onClick={handleEditClick}>Actualizează dosar</button>

      <div className="documents-container">
        <h3>Documente</h3>
        <ul>
          {documents.map((doc) => (
            <li key={doc.documentId}>
              <h4>{doc.title}</h4>
              <a href={`http://localhost:8080${doc.url}`} target="_blank" rel="noopener noreferrer">Vizualizează document</a>
              <p> </p>
              <button className="delete-button" onClick={() => handleDeleteDocument(doc.documentId)}>Șterge document</button>
            </li>
          ))}
        </ul>
      </div>
      <button className="btn btn-secondary" onClick={handleAddDocumentClick}>Adaugă document</button>

      {observations && (
        <div className="observations-container">
          <h3>Observații</h3>
          <p>{observations}</p>
        </div>
      )}
    </div>
  );
};

export default ViewCase;
