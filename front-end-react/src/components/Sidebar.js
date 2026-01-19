import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li><NavLink to="/clients" activeclassname="active-link">Clienți</NavLink></li>
          <li><NavLink to="/cases" activeclassname="active-link">Dosare</NavLink></li>
          <li><NavLink to="/documents" activeclassname="active-link">Documente</NavLink></li> 
          <li><NavLink to="/calendar" activeclassname="active-link">Calendar</NavLink></li>
          <li><NavLink to="/notifications" activeclassname="active-link">Notificări</NavLink></li>
          <li><NavLink to="/generate" activeclassname="active-link">Generează document</NavLink></li>   
          <li><NavLink to="/statistics" activeclassname="active-link">Statistici</NavLink></li>
          <li><NavLink to="/calculator" activeclassname="active-link">Calculator</NavLink></li>
          <li><NavLink to="/transactions" activeclassname="active-link">Istoric tranzacții</NavLink></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
