import { blockchainInstance } from '../utils/blockchain.js';

export const getDocumentBlockchain = (req, res) => {
  try {
    console.log('Blockchain state:', JSON.stringify(blockchainInstance, null, 2));
    res.status(200).json({ chain: blockchainInstance.chain, isValid: blockchainInstance.isChainValid() });
  } catch (error) {
    console.error('Error fetching blockchain:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
