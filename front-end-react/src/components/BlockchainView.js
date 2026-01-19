
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlockchainView = () => {
  const [blockchain, setBlockchain] = useState([]);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const fetchBlockchain = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/documents/blockchain', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBlockchain(response.data.chain);
        setIsValid(response.data.isValid);
      } catch (error) {
        console.error('Eroare la preluarea blockchain-ului:', error);
      }
    };

    fetchBlockchain();
  }, []);

  return (
    <div>
      <h2>Blockchain</h2>
      <p>Blockchain valid: {isValid ? 'Da' : 'Nu'}</p>
      <ul>
        {blockchain.length === 0 ? (
          <p>Nu există blocuri în blockchain.</p>
        ) : (
          blockchain.map((block, index) => (
            <li key={index}>
              <p>Index: {block.index}</p>
              <p>Timestamp: {block.timestamp}</p>
              <p>Data: {JSON.stringify(block.data)}</p>
              <p>Previous Hash: {block.previousHash}</p>
              <p>Hash: {block.hash}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default BlockchainView;
