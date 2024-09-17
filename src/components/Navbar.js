import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './css/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      {/* Nombre de la app */}
      <div className="app-name">
        <h1>FunctionalGym</h1>
      </div>

      {/* Enlaces de navegación para pantallas grandes */}
      <ul className="nav-links">
        <li><Link to="/" className="nav-link">Sección 1</Link></li>
        <li><Link to="/" className="nav-link">Sección 2</Link></li>
        <li><Link to="/" className="nav-link">Sección 3</Link></li>
        <li><Link to="/" className="nav-link">Sección 4</Link></li>
        <li><Link to="/login" className="nav-link">Login</Link></li>
      </ul>

      {/* Botón hamburguesa visible solo en pantallas móviles */}
      <div className="hamburger-menu" onClick={toggleMenu}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="hamburger-icon" />
      </div>

      {/* Menú lateral para pantallas móviles con animación */}
      <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
        <div className="close-icon" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faTimes} className="hamburger-icon" />
        </div>
        <ul className="mobile-nav-links">
          <li><Link to="/" className="mobile-nav-link" onClick={toggleMenu}>Sección 1</Link></li>
          <li><Link to="/" className="mobile-nav-link" onClick={toggleMenu}>Sección 2</Link></li>
          <li><Link to="/" className="mobile-nav-link" onClick={toggleMenu}>Sección 3</Link></li>
          <li><Link to="/" className="mobile-nav-link" onClick={toggleMenu}>Sección 4</Link></li>
          <li><Link to="/login" className="mobile-nav-link" onClick={toggleMenu}>Login</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
