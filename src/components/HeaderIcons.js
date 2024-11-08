import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCirclePlus, faInfoCircle } from '@fortawesome/free-solid-svg-icons'; // Icono adicional
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../authContext/AuthContext';
import './css/HeaderIcons.css';

const HeaderIcons = ({ icon, title, onAddClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole } = useAuth(); // Obtenemos el rol del usuario desde el contexto

  // Array de rutas para redirección en el botón "Agregar"
  const addRedirectRoutes = [
    { url: '/calendar', redirectTo: '/planificacion' },
    { url: '/class', redirectTo: '/clase' },
    { url: '/clients', redirectTo: '/cliente' },
    { url: '/reservations', redirectTo: '/reserva' },
  ];

  // Función para manejar la redirección del botón "Agregar"
  const handleAddClick = () => {
    const currentRoute = addRedirectRoutes.find(route => route.url === location.pathname);
    if (currentRoute) {
      navigate(currentRoute.redirectTo);
    } else if (onAddClick) {
      onAddClick();
    }
  };

  // Función para el botón de volver
  const handleBackClick = () => {
    const isRedirectRoute = addRedirectRoutes.some(route => route.redirectTo === location.pathname);
    if (isRedirectRoute) {
      navigate(-1);
    } else {
      navigate('/dashboard');
    }
  };

  // Condicional para el estilo de justify-content

  return (
    <div className="header-icons">
      <button onClick={handleBackClick} className="header-icon-back">
        <FontAwesomeIcon icon={faArrowLeft} className='header-icon-back-icon'/>
      </button>
      
      <h1 className={`class-header-header-icons`}>
        <FontAwesomeIcon icon={icon} className="header-icon" />
        {title}
      </h1>
      
      {/* Mostrar botón según el role */}
      {userRole === 1  ? (
        <button onClick={handleAddClick} className="header-icon-add">
          <FontAwesomeIcon icon={faCirclePlus} className="header-icon-add-icon"/>
          <span className="header-agregar">Agregar</span>
        </button>
      ) : (
        <button className="header-icon-info">
          <FontAwesomeIcon icon={faInfoCircle} className="header-icon-info-icon"/>
          <span className="header-info">Más info</span>
        </button>
      )}
    </div>
  );
};

export default HeaderIcons;
