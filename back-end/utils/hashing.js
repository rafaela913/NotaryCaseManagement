import crypto from 'crypto-js';

export const generateDocumentHash = (documentContent) => {
    return crypto.SHA256(documentContent).toString();
};
