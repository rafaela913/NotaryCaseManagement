import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import CaseList from './CaseList';
import './ClientDetails.css';

const ClientDetails = () => {
  const { clientId } = useParams();
  const [client, setClient] = useState(null);
  const [cases, setCases] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedClient, setEditedClient] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const token = localStorage.getItem('token');

        const clientResponse = await axios.get(`/api/clients/${clientId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClient(clientResponse.data.client);
        setEditedClient(clientResponse.data.client);

        const casesResponse = await axios.get(`/api/clients/${clientId}/cases`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCases(casesResponse.data.cases || []);
      } catch (error) {
        console.error('Eroare la preluarea detaliilor clientului:', error);
      }
    };

    fetchClientDetails();
  }, [clientId]);

  const handleAddCase = () => navigate(`/clients/${clientId}/add-case`);
  const handleEditClick = () => setIsEditing(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedClient({ ...editedClient, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/clients/${clientId}`, editedClient, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClient(editedClient);
      setIsEditing(false);
    } catch (error) {
      console.error('Eroare la actualizarea detaliilor clientului:', error);
    }
  };

  if (!client) return <p className="loading-text">Încărcare...</p>;

  return (
    <div className="client-details-page">
      <Sidebar />

      <div className="client-details-content">
       
        <div className="details-page-header">
          <button
            className="header-button"
            onClick={() => navigate('/clients')}
          >
            Înapoi
          </button>

          <h1>Detaliile clientului</h1>

          <div /> 
        </div>

        
        <div className="details-container">
          
          <h2 className="section-title">Date client</h2>

          {isEditing ? (
            <div className="details-form">
              <label>Prenume</label>
              <input
                name="firstname"
                value={editedClient.firstname || ''}
                onChange={handleInputChange}
              />

              <label>Nume</label>
              <input
                name="lastname"
                value={editedClient.lastname || ''}
                onChange={handleInputChange}
              />

              <label>Email</label>
              <input
                name="email"
                value={editedClient.email || ''}
                onChange={handleInputChange}
              />

              <label>Număr de telefon</label>
              <input
                name="phoneNumber"
                value={editedClient.phoneNumber || ''}
                onChange={handleInputChange}
              />

              <button className="primary-button" onClick={handleSaveClick}>
                Salvează
              </button>
            </div>
          ) : (
            <div className="details-view">
              <p><strong>Prenume:</strong> {client.firstname}</p>
              <p><strong>Nume:</strong> {client.lastname}</p>
              <p><strong>Email:</strong> {client.email}</p>
              <p><strong>Telefon:</strong> {client.phoneNumber}</p>

              <button className="primary-button" onClick={handleEditClick}>
                Editează
              </button>
            </div>
          )}

          <div className="section-divider" />

          <div className="cases-block">
            <div className="cases-header">
              <h2 className="section-title">Dosare</h2>

              <button
                className="primary-button"
                onClick={handleAddCase}
              >
                Adaugă dosar
              </button>
            </div>

            <CaseList cases={cases} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
