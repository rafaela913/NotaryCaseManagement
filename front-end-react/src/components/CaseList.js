import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CaseList.css';

const CaseList = ({ cases }) => {
  const navigate = useNavigate();

  const handleCaseClick = (caseId) => {
    navigate(`/cases/${caseId}`);
  };

  return (
    <div className="case-list-container">
      <h2>Dosare</h2>
      {cases.length === 0 ? (
        <p>Nu există niciun dosar pentru acest client.</p>
      ) : (
        <ul>
          {cases.map((c) => (
            <li key={c.caseId} onClick={() => handleCaseClick(c.caseId)}>
            <p>{c.title}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CaseList;











// import React, { useState } from 'react';
// import axios from 'axios';
// import './CaseList.css';
// const CaseList = ({ cases, clientId }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [status, setStatus] = useState('Prelucrare');
//   const [message, setMessage] = useState('');

//   const handleAddCase = async (event) => {
//     event.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post('/api/cases', 
//         { clientId, title, description, status },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (response.status === 201) {
//         setTitle('');
//         setDescription('');
//         setStatus('Prelucrare');
//         setMessage('Dosar adăugat cu succes');
//         window.location.reload(); // Refresh page to show the new case
//       }
//     } catch (error) {
//       setMessage(error.response?.data?.message || 'Eroare de server');
//       console.error('Error adding case:', error.response?.data || error);
//     }
//   };

//   return (
//     <div className="case-list-container">
//       <h2>Dosare</h2>
//       {cases.length === 0 ? (
//         <p>Nu există niciun dosar pentru acest client.</p>
//       ) : (
//         <ul>
//           {cases.map((c) => (
//             <li key={c.caseId}>{c.title}</li>
//           ))}
//         </ul>
//       )}
      
//       <p>{message}</p>
//     </div>
//   );
// };
// export default CaseList;