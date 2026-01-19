import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';
import background from '../assets/background.jpg'; 

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

    const userData = isSignup
      ? { email, password, firstname, lastname, phoneNumber }
      : { email, password };

    try {
      const response = await axios.post(
        isSignup ? '/auth/signup' : '/auth/login',
        userData
      );
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
    <div
      className="auth-page"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <div className="auth-form-container">
        <h2>{isSignup ? 'Înregistrare' : 'Autentificare'}</h2>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <label>Prenume</label>
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />

              <label>Nume</label>
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />

              <label>Telefon</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </>
          )}

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Parolă</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {isSignup && (
            <>
              <label>Confirmare parolă</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </>
          )}

          <button type="submit">
            {isSignup ? 'Înregistrează-te' : 'Autentificare'}
          </button>
        </form>

        {message && (
          <p className={`message ${message.includes('reușită') ? 'success' : 'error'}`}>
            {message}
          </p>
        )}

        <p>
          {isSignup ? 'Deja ai cont?' : 'Nu ai cont?'}{' '}
          <button
            className="toggle-button"
            onClick={() => navigate(isSignup ? '/login' : '/signup')}
          >
            {isSignup ? 'Autentificare' : 'Înregistrare'}
          </button>
        </p>

        {!isSignup && (
          <p>
            <button
              className="toggle-button"
              onClick={() => navigate('/request-password-reset')}
            >
              Am uitat parola
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
