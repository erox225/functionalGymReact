import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen, faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom'; // Corrige esta línea
import './css/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Aquí se usa useLocation

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      {/* Nombre de la app */}
      <div className="app-name">
        <h1>
        <Link to="/" className="nav-link">FunctionalGym</Link>
        </h1>
      </div>

      {/* Enlaces de navegación para pantallas grandes */}
      <ul className="nav-links">
        <li><Link to="/" className="nav-link">Sección 1</Link></li>
        <li><Link to="/" className="nav-link">Sección 2</Link></li>
        <li><Link to="/" className="nav-link">Sección 3</Link></li>
        <li><Link to="/" className="nav-link">Sección 4</Link></li>
        <li><Link to="/login" className="nav-link">Login</Link></li>
      </ul>

      {location.pathname === '/login' && location.pathname === '/'? (
   
           <Link to="/login" className="nav-link">
           <FontAwesomeIcon icon={faDoorClosed} className="client-access-search-icon" />
         </Link>
      ) : (
        <Link to="/login" className="nav-link">
        <FontAwesomeIcon icon={faDoorOpen} className="client-access-search-icon" />
      </Link>
      )}
    </nav>
  );
};

export default Navbar;
