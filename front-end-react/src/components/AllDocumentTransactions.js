import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './AllDocumentTransactions.css';

const AllDocumentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/api/transactions/all', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setTransactions(response.data.transactions || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Eroare la preluarea tranzacțiilor.');
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="tx-page">
      <Sidebar />

      <div className="tx-content">
        
        <div className="tx-header">
          <button className="header-button" onClick={() => navigate('/dashboard')}>
            Înapoi
          </button>

          <h1>Tranzacții documente</h1>
        </div>

        <div className="tx-container">
          {loading && <div className="tx-state">Se încarcă...</div>}
          {!loading && error && <div className="tx-state">{error}</div>}

          {!loading && !error && (
            <>
              <h2 className="tx-subtitle">Tranzacții pentru toate documentele</h2>

              {transactions.length === 0 ? (
                <div className="tx-empty">Nu există tranzacții pentru documente.</div>
              ) : (
                <div className="tx-list">
                  {transactions.map((transaction) => (
                    <div key={transaction.transactionId} className="tx-card">
                      <div className="tx-row">
                        <span>Nume document</span>
                        <strong>{transaction.Document ? transaction.Document.title : 'N/A'}</strong>
                      </div>

                      <div className="tx-row">
                        <span>Document ID</span>
                        <strong>{transaction.documentId}</strong>
                      </div>

                      <div className="tx-row">
                        <span>Tip</span>
                        <strong>{transaction.type}</strong>
                      </div>

                      <div className="tx-row">
                        <span>Hash</span>
                        <code className="tx-hash">{transaction.hash}</code>
                      </div>

                      <div className="tx-row">
                        <span>Previous Hash</span>
                        <code className="tx-hash">{transaction.previousHash}</code>
                      </div>

                      <div className="tx-row">
                        <span>Timp</span>
                        <strong>{new Date(transaction.timestamp).toLocaleString()}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllDocumentTransactions;
