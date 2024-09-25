import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faHome, faEnvelope } from '@fortawesome/free-solid-svg-icons'; // Importamos los iconos
import './css/FooterButtons.css';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    navigate(-1); // Navega a la página anterior
  };

  // Lista de rutas donde el footer estará visible
  const showFooterInRoutes = ['/dashboard', '/clients','/class','/reservations','/accessControl','/calendar','/configurations'];

  // Verificamos si la ruta actual está en la lista
  if (!showFooterInRoutes.includes(location.pathname)) {
    return null; // No renderizar el footer si no está en las rutas específicas
  }

  return (
    <footer className="mobile-footer">
      <button onClick={goBack} className="footer-btn">
        <FontAwesomeIcon icon={faArrowLeft} /> Volver
      </button>
      <Link to="/" className="footer-btn">
        <FontAwesomeIcon icon={faHome} /> Home
      </Link>
      <Link to="/contact" className="footer-btn">
        <FontAwesomeIcon icon={faEnvelope} /> Perfil
      </Link>
    </footer>
  );
};

export default Footer;