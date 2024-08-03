import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
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
          headers: { Authorization: `Bearer ${token}` }
        });
        setClient(clientResponse.data.client);
        setEditedClient(clientResponse.data.client);

        const casesResponse = await axios.get(`/api/clients/${clientId}/cases`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCases(casesResponse.data.cases || []); 
      } catch (error) {
        console.error('Eroare la preluarea detaliilor clientului:', error);
      }
    };

    fetchClientDetails();
  }, [clientId]);

  const handleAddCase = () => {
    navigate(`/clients/${clientId}/add-case`);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedClient({ ...editedClient, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/clients/${clientId}`, 
        editedClient,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setClient(editedClient);
      setIsEditing(false);
    } catch (error) {
      console.error('Eroare la actualizarea detaliilor clientului:', error);
    }
  };

  if (!client) {
    return <p>Încărcare...</p>;
  }

  return (
    <div className="client-details-container">
      <button className="back-button" onClick={() => navigate('/clients')}>Înapoi</button>
      <h2>Detaliile clientului</h2>
      {isEditing ? (
        <div>
          <label htmlFor="firstname">Prenume:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={editedClient.firstname}
            onChange={handleInputChange}
          />
          <label htmlFor="lastname">Nume:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={editedClient.lastname}
            onChange={handleInputChange}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={editedClient.email}
            onChange={handleInputChange}
          />
          <label htmlFor="phoneNumber">Număr de telefon:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={editedClient.phoneNumber}
            onChange={handleInputChange}
          />
          <button className="btn btn-primary" onClick={handleSaveClick}>Salvează</button>
        </div>
      ) : (
        <div>
          <p>Prenume: {client.firstname}</p>
          <p>Nume: {client.lastname}</p>
          <p>Email: {client.email}</p>
          <p>Număr de telefon: {client.phoneNumber}</p>
          <button className="btn btn-primary" onClick={handleEditClick}>Editează</button>
        </div>
      )}

      
      <CaseList cases={cases} />

      <button className="add-case-button" onClick={handleAddCase}>Adaugă dosar</button>
    </div>
  );
};

export default ClientDetails;
