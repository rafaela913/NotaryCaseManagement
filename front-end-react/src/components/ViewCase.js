import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
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
          headers: { Authorization: `Bearer ${token}` },
        });

        const caseData = response.data.case || response.data;
        setCaseDetails(caseData);
        setDocuments(caseData.Documents || []);
      } catch (error) {
        console.error('Eroare la preluarea detaliilor dosarului:', error);
      }
    };

    fetchCaseDetails();
  }, [caseId]);

  const handleEditClick = () => navigate(`/cases/${caseId}/edit`);
  const handleAddDocumentClick = () => navigate(`/cases/${caseId}/add-document`);

  const handleDeleteDocument = async (documentId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/documents/${documentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDocuments((prev) => prev.filter((doc) => doc.documentId !== documentId));
    } catch (error) {
      console.error('Eroare la ștergerea documentului:', error);
    }
  };

  if (!caseDetails) {
    return <p className="loading-text">Încărcare...</p>;
  }

  const { title, description, status, openingDate, observations } = caseDetails;

  return (
    <div className="view-case-page">
      <Sidebar />

      <div className="view-case-content">
        
        <div className="view-case-header">
          <button className="header-button" onClick={() => navigate(-1)}>
            Înapoi
          </button>

          <h1>Detaliile dosarului</h1>

          <div /> 
        </div>

       
        <div className="view-case-container">
          
          <div className="section">
            <h2 className="section-title">Date dosar</h2>

            <p><strong>Titlu:</strong> {title}</p>
            <p><strong>Descriere:</strong> {description}</p>
            <p><strong>Status:</strong> {status}</p>
            <p>
              <strong>Data deschiderii:</strong>{' '}
              {openingDate ? new Date(openingDate).toLocaleDateString() : '-'}
            </p>

            <button className="primary-button" onClick={handleEditClick}>
              Actualizează dosar
            </button>
          </div>

          <div className="section-divider" />

          
          <div className="section">
            <div className="section-row">
              <h2 className="section-title">Documente</h2>

              <button className="primary-button" onClick={handleAddDocumentClick}>
                Adaugă document
              </button>
            </div>

            {documents.length > 0 ? (
              <ul className="documents-list">
                {documents.map((doc) => (
                  <li key={doc.documentId} className="document-item">
                    <div className="document-top">
                      <h3 className="document-title">{doc.title}</h3>

                      <button
                        className="danger-link"
                        onClick={() => handleDeleteDocument(doc.documentId)}
                      >
                        Șterge
                      </button>
                    </div>

                    <a
                      className="document-link"
                      href={`http://localhost:8080${doc.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Vizualizează document
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-text">Nu există documente pentru acest dosar.</p>
            )}
          </div>

         
          {observations && (
            <>
              <div className="section-divider" />
              <div className="section">
                <h2 className="section-title">Observații</h2>
                <p className="observations-text">{observations}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewCase;
