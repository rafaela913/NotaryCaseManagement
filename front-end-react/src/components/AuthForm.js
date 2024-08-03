// components/AuthForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

const AuthForm = ({ isSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSignup && password !== confirmPassword) {
      setMessage('Parolele nu se potrivesc');
      return;
    }

    const userData = isSignup ? { email, password, firstname, lastname, phoneNumber } : { email, password };

    try {
      const response = await axios.post(isSignup ? '/auth/signup' : '/auth/login', userData);
      if (response.status === 200 || response.status === 201) {
        setMessage(isSignup ? 'Înregistrare reușită' : 'Autentificare reușită');
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard'); 
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Eroare de server');
    }
  };

  return (
    <div className="auth-form-container">
      <h2>{isSignup ? 'Înregistrare' : 'Autentificare'} </h2>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <>
            <label htmlFor="firstname">Prenume:</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
            <label htmlFor="lastname">Nume:</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
            <label htmlFor="phoneNumber">Număr de telefon:</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </>
        )}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Parolă:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {isSignup && (
          <>
            <label htmlFor="confirmPassword">Confirmare Parolă:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </>
        )}
        <button type="submit">{isSignup ? 'Înregistrează-te' : 'Autentificare'}</button>
      </form>
      <p>{message}</p>
      <p>
        {isSignup ? 'Deja ai un cont?' : 'Nu ai un cont?'}{' '}
        <button className="toggle-button" onClick={() => navigate(isSignup ? '/login' : '/signup')}>
          {isSignup ? 'Autentificare' : 'Înregistrează-te'}
        </button>
      </p>
      {!isSignup && (
        <p>
          <button className="toggle-button" onClick={() => navigate('/request-password-reset')}>
            Am uitat parola
          </button>
        </p>
      )}
    </div>
  );
};

export default AuthForm;
