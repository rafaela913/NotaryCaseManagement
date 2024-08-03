import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/auth/login', { email, password });
      if (response.status === 200) {
        setMessage('Autentificare reușită');
        localStorage.setItem('token', response.data.token);
        navigate('/'); 
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Eroare de server');
    }
  };

  return (
    <div>
      <h2>Autentificare Notari</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />
        <label htmlFor="password">Parolă:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Autentificare</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;
