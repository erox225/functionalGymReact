import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faDoorOpen, faDoorClosed, faCalendarAlt, faEdit, faUserFriends, faClipboardList, faLock } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom'; // Corrige esta línea
import './css/Navbar.css';

const allowedPaths = [
   '/calendar',
   '/class',
   '/clients',
   '/reservations',
   '/accessControl',
   '/dashboard',
   '/planificacion'
]; // Array con las rutas permitidas

const allowedPaths2 = [
  '/'
]; // Array con las rutas permitidas

const allowedPaths3 = [
  '/login'
]; // Array con las rutas permitidas

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
        <p className='suscription-type'>Premium</p>
        </h1>
      </div>

      {allowedPaths.includes(location.pathname) ? (
        <ul className="nav-links">
          <li>
            <Link to="/calendar" className="nav-link">
              <FontAwesomeIcon icon={faCalendarAlt} className="nav-icon" />
              <span className='name-icon-navbar'>
              Calendario
              </span>
              
            </Link>
          </li>
          <li>
            <Link to="/class" className="nav-link">
              <FontAwesomeIcon icon={faEdit} className="nav-icon" />
              <span className='name-icon-navbar'>
              Editar Clases 
              </span>
             
            </Link>
          </li>
          <li>
            <Link to="/clients" className="nav-link">
              <FontAwesomeIcon icon={faUserFriends} className="nav-icon" />
              <span className='name-icon-navbar'>
              Clientes
              </span>
             
            </Link>
          </li>
          <li>
            <Link to="/reservations" className="nav-link">
              <FontAwesomeIcon icon={faClipboardList} className="nav-icon" />
              <span className='name-icon-navbar'>
              Lista de Reservas
              </span>
              
            </Link>
          </li>
          <li>
            <Link to="/accessControl" className="nav-link">
              <FontAwesomeIcon icon={faLock} className="nav-icon" />
              <span className='name-icon-navbar'>
              Control de accesos
              </span>
             
            </Link>
          </li>
        </ul>
      ) : null}

{allowedPaths.includes(location.pathname) ? (
  <Link to="/login" className="nav-link" style={{ marginLeft: '16px' }}>
  <FontAwesomeIcon icon={faDoorOpen} className="nav-icon" />
  <span style={{ marginTop: '3px' }}
  className="nav-salir"
  >
    Salir
  </span>
</Link>

) : null}

      {allowedPaths2.includes(location.pathname) ? (
        <Link to="/login" className="nav-link-iniciar-sesion">
          <span style={{ marginRight: '6px' }}>Iniciar Sesión</span>
          <FontAwesomeIcon icon={faDoorClosed} className="client-access-search-icon" />
        </Link>
      ) : null}

{allowedPaths3.includes(location.pathname) ? (
        <Link to="/" className="nav-link-iniciar-sesion">
          <FontAwesomeIcon icon={faArrowLeft} className="client-access-search-icon" />
          <span>Volver</span>
        </Link>
      ) : null}
    </nav>
  );
};

export default Navbar;
