import React from 'react';
import { useNavigate } from 'react-router-dom';
import navbarBg from '../assets/navbar-bg.jpg';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div
      className="navbar"
      style={{ backgroundImage: `url(${navbarBg})` }}
    >
      <h1>Notar Track</h1>
      <button onClick={handleLogout}>Deconectare</button>
    </div>
  );
};

export default Navbar;
