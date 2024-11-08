import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChalkboardTeacher, faHome, faUserFriends, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import './css/FooterButtons.css';
import { useAuth } from '../authContext/AuthContext';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole } = useAuth(); // Obtener el rol del usuario desde AuthContext

  // Lista de rutas donde el footer estará visible
  const showFooterInRoutes = ['/dashboard', '/clients', '/class', '/reservations', '/accessControl', '/calendar', '/configurations', '/reserva', '/cliente', '/clase', '/planificacion'];

  // Verificamos si la ruta actual está en la lista
  if (!showFooterInRoutes.includes(location.pathname)) {
    return null; // No renderizar el footer si no está en las rutas específicas
  }

  return (
    <footer className="mobile-footer">
      <div className='box-footer-mobile'>
        <Link to="/calendar" className={`footer-btn ${location.pathname === '/calendar' ? 'selected' : ''}`}>
          <div className='box-icon-footer-mobile'>
            <FontAwesomeIcon icon={faCalendarAlt} />
          </div>
          <span className='name-btn-footer'>Calendario</span>
        </Link>
      </div>

      {/* Condicional basado en el rol del usuario */}
      {userRole === 1 && (
        <div className='box-footer-mobile'>
          <Link to="/class" className={`footer-btn ${location.pathname === '/class' ? 'selected' : ''}`}>
            <div className='box-icon-footer-mobile'>
              <FontAwesomeIcon icon={faChalkboardTeacher} />
            </div>
            <span className='name-btn-footer'>Clases</span>
          </Link>
        </div>
      )}

      <div className='box-footer-mobile'>
        <Link to="/dashboard" className={`footer-btn ${(location.pathname === '/accessControl' || location.pathname === '/dashboard') ? 'selected' : ''}`}>
          <div className='box-icon-footer-mobile'>
            <FontAwesomeIcon icon={faHome} />
          </div>
          <span className='name-btn-footer'>Home</span>
        </Link>
      </div>

      {userRole === 1 && (
        <div className='box-footer-mobile'>
          <Link to="/clients" className={`footer-btn ${location.pathname === '/clients' ? 'selected' : ''}`}>
            <div className='box-icon-footer-mobile'>
              <FontAwesomeIcon icon={faUserFriends} />
            </div>
            <span className='name-btn-footer'>Clientes</span>
          </Link>
        </div>
      )}

      <div className='box-footer-mobile'>
        <Link to="/reservations" className={`footer-btn ${location.pathname === '/reservations' ? 'selected' : ''}`}>
          <div className='box-icon-footer-mobile'>
            <FontAwesomeIcon icon={faClipboardList} />
          </div>
          <span className='name-btn-footer'>Reservas</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
