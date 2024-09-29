import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faHome, faEnvelope, faCalendarAlt, faChalkboardTeacher, faUserFriends, faClipboardList, faLock } from '@fortawesome/free-solid-svg-icons'; // Importamos los iconos correctamente
import './css/FooterButtons.css';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    navigate(-1); // Navega a la página anterior
  };

  // Lista de rutas donde el footer estará visible
  const showFooterInRoutes = ['/dashboard', '/clients', '/class', '/reservations', '/accessControl', '/calendar', '/configurations'];

  // Verificamos si la ruta actual está en la lista
  if (!showFooterInRoutes.includes(location.pathname)) {
    return null; // No renderizar el footer si no está en las rutas específicas
  }

  return (
    <footer className="mobile-footer">
      <div className='box-footer-mobile'>
        <Link to="/calendar" className="footer-btn">
        <div className='box-icon-footer-mobile'>
        <FontAwesomeIcon icon={faCalendarAlt} />
        </div>
        <span className='name-btn-footer'>Calendario</span>
        </Link>
        
      </div>
    <div className='box-footer-mobile'>
     <Link to="/class" className="footer-btn">
     <div className='box-icon-footer-mobile'>
     <FontAwesomeIcon icon={faChalkboardTeacher} />
     </div>
        <span className='name-btn-footer'>Clases</span>
      </Link>
    </div>

    <div  className='box-footer-mobile'>
     <Link to="/accessControl" className="footer-btn">
     <div className='box-icon-footer-mobile'>
     <FontAwesomeIcon icon={faHome} />
     </div>
        <span className='name-btn-footer'>Home</span>
      </Link>
    </div>

    <div  className='box-footer-mobile'>
      <Link to="/clients" className="footer-btn">
      <div className='box-icon-footer-mobile'>
      <FontAwesomeIcon icon={faUserFriends} />
      </div>
        <span className='name-btn-footer'>Clientes</span>
      </Link>
     
    </div>
    <div  className='box-footer-mobile'>
     <Link to="/reservations" className="footer-btn">
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
