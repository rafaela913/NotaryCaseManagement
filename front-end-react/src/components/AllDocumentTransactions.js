import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AllDocumentTransactions.css'; 
import { useNavigate } from 'react-router-dom';

const AllDocumentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/api/transactions/all', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` 
          }
        });
        console.log('Response data:', response.data);
        setTransactions(response.data.transactions);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Eroare la preluarea tranzacțiilor.');
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <div className="loading">Se încarcă...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="all-document-transactions-container">
        <button className="btn btn-back" onClick={() => navigate('/dashboard')}>Înapoi</button>
      <h2>Tranzacții pentru toate documentele</h2>
      <ul>
        {transactions && transactions.length > 0 ? (
          transactions.map(transaction => (
            <li key={transaction.transactionId}>
              <p><strong>Nume Document:</strong> {transaction.Document ? transaction.Document.title : 'N/A'}</p>
              <p><strong>Document ID:</strong> {transaction.documentId}</p>
              <p><strong>Tip:</strong> {transaction.type}</p>
              <p><strong>Hash:</strong> {transaction.hash}</p>
              <p><strong>Previous Hash:</strong> {transaction.previousHash}</p>
              <p><strong>Timp:</strong> {new Date(transaction.timestamp).toLocaleString()}</p>
            </li>
          ))
        ) : (
          <li>Nu există tranzacții pentru documente.</li>
        )}
      </ul>
    </div>
  );
};

export default AllDocumentTransactions;
