import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.log('Token lipsă');
    return res.status(401).json({ message: 'Acces neautorizat. Token lipsă.' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Token primit:', token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.notaryId = decoded.notaryId;
    console.log('Notary ID extras:', req.notaryId);
    next();
  } catch (error) {
    console.log('Token invalid:', error);
    res.status(401).json({ message: 'Acces neautorizat. Token invalid.' });
  }
};

export { authenticateJWT };
