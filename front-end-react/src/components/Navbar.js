import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="navbar">
      <h1>Notar Track</h1>
      <button onClick={handleLogout}>Deconectare</button>
    </div>
  );
};

export default Navbar;
