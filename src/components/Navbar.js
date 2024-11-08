import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faDoorOpen, faDoorClosed, faCalendarAlt, faEdit, faUserFriends, faClipboardList, faLock } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import './css/Navbar.css';
import { useAuth } from '../authContext/AuthContext';

const allowedPaths = [
   '/calendar',
   '/class',
   '/clients',
   '/reservations',
   '/accessControl',
   '/dashboard',
   '/planificacion'
];

const allowedPaths2 = ['/'];
const allowedPaths3 = ['/login'];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { userRole } = useAuth(); // Obtener el rol del usuario desde AuthContext

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="app-name">
        <h1>
          <Link to="/" className="nav-link">FunctionalGym</Link>
          <p className='suscription-type'>Premium</p>
        </h1>
      </div>

      {allowedPaths.includes(location.pathname) && (
        <ul className="nav-links">
          <li>
            <Link to="/calendar" className="nav-link">
              <FontAwesomeIcon icon={faCalendarAlt} className="nav-icon" />
              <span className='name-icon-navbar'>Calendario</span>
            </Link>
          </li>

          {/* Condicionales basados en el rol del usuario */}
          {userRole === 1 && (
            <li>
              <Link to="/class" className="nav-link">
                <FontAwesomeIcon icon={faEdit} className="nav-icon" />
                <span className='name-icon-navbar'>Editar Clases</span>
              </Link>
            </li>
          )}

          {userRole === 1 && (
            <li>
              <Link to="/clients" className="nav-link">
                <FontAwesomeIcon icon={faUserFriends} className="nav-icon" />
                <span className='name-icon-navbar'>Clientes</span>
              </Link>
            </li>
          )}

          <li>
            <Link to="/reservations" className="nav-link">
              <FontAwesomeIcon icon={faClipboardList} className="nav-icon" />
              <span className='name-icon-navbar'>Lista de Reservas</span>
            </Link>
          </li>

          <li>
            <Link to="/accessControl" className="nav-link">
              <FontAwesomeIcon icon={faLock} className="nav-icon" />
              <span className='name-icon-navbar'>Control de accesos</span>
            </Link>
          </li>
        </ul>
      )}

      {allowedPaths.includes(location.pathname) && (
        <Link to="/login" className="nav-link" style={{ marginLeft: '16px' }}>
          <FontAwesomeIcon icon={faDoorOpen} className="nav-icon" />
          <span className="nav-salir" style={{ marginTop: '3px' }}>Salir</span>
        </Link>
      )}

      {allowedPaths2.includes(location.pathname) && (
        <Link to="/login" className="nav-link-iniciar-sesion">
          <span style={{ marginRight: '6px' }}>Iniciar Sesión</span>
          <FontAwesomeIcon icon={faDoorClosed} className="client-access-search-icon" />
        </Link>
      )}

      {allowedPaths3.includes(location.pathname) && (
        <Link to="/" className="nav-link-iniciar-sesion">
          <FontAwesomeIcon icon={faArrowLeft} className="client-access-search-icon" />
          <span>Volver</span>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
