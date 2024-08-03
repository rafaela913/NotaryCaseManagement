import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CaseDetails.css';

const CaseDetails = () => {
  const { caseId } = useParams();
  const [caseDetails, setCaseDetails] = useState(null);

  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/cases/${caseId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCaseDetails(response.data);
      } catch (error) {
        console.error('Eroare la preluarea detaliilor dosarului:', error);
      }
    };

    fetchCaseDetails();
  }, [caseId]);

  if (!caseDetails) {
    return <p>Încărcare...</p>;
  }

  const { title, description, status, openingDate } = caseDetails;

  return (
    <div className="case-details-container">
      <h2>Detalii Dosar</h2>
      <p><strong>Titlu:</strong> {title}</p>
      <p><strong>Descriere:</strong> {description}</p>
      <p><strong>Status:</strong> {status}</p>
      <p><strong>Data deschiderii:</strong> {new Date(openingDate).toLocaleDateString()}</p>
    
    </div>
  );
};

export default CaseDetails;
