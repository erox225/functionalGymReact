import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCirclePlus, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../authContext/AuthContext';
import './css/HeaderIcons.css';

const HeaderIcons = ({ icon, title, onAddClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole } = useAuth();

  // Array de rutas para redirección en el botón "Agregar"
  const addRedirectRoutes = [
    { url: '/calendar', redirectTo: '/planificacion' },
    { url: '/class', redirectTo: '/clase' },
    { url: '/clients', redirectTo: '/cliente' },
    { url: '/reservations', redirectTo: '/reserva' },
  ];

  // Rutas específicas que requieren volver a la página anterior en lugar del dashboard
  const routesWithBack = [
    /^\/planificacion$/, 
    /^\/clase$/, 
    /^\/cliente$/,
    /^\/planificacion\/\d+$/, 
    /^\/clase\/\d+$/, 
    /^\/cliente\/\d+$/
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
    // Verifica si la ruta actual coincide con alguna de las rutas que requieren volver en lugar del dashboard
    const isRouteWithBack = routesWithBack.some(route => route.test(location.pathname));
    if (isRouteWithBack) {
      navigate(-1); // Navega a la página anterior
    } else {
      navigate('/dashboard'); // Navega al dashboard si no coincide
    }
  };

  return (
    <div className="header-icons">
      <button onClick={handleBackClick} className="header-icon-back">
        <FontAwesomeIcon icon={faArrowLeft} className='header-icon-back-icon'/>
      </button>
      
      <h1 className="class-header-header-icons">
        <FontAwesomeIcon icon={icon} className="header-icon" />
        {title}
      </h1>
      
      {/* Mostrar botón según el role */}
      {userRole === 1 ? (
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
