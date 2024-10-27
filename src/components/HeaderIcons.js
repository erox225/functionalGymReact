import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './css/HeaderIcons.css';

const HeaderIcons = ({ icon, title, onAddClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Array de rutas para redirección en el botón "Agregar"
  const addRedirectRoutes = [
    { url: '/calendar', redirectTo: '/planificacion' },
    { url: '/class', redirectTo: '/clase' },
    { url: '/clients', redirectTo: '/cliente' },
    { url: '/reservations', redirectTo: '/reserva' },
    // Agrega más rutas aquí si es necesario
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

  // Determina si la ruta actual está en el array de rutas para redirección
  const isAddButtonVisible = addRedirectRoutes.some(route => route.url === location.pathname);

  // Función para el botón de volver
  const handleBackClick = () => {
    const isRedirectRoute = addRedirectRoutes.some(route => route.redirectTo === location.pathname);
    if (isRedirectRoute) {
      navigate(-1); // Navega a la página anterior en el historial
    } else {
      navigate('/dashboard'); // Redirige al dashboard por defecto
    }
  };

  return (
    <div className="header-icons">
      {/* Botón para volver */}
      <button onClick={handleBackClick} className="header-icon-back">
        <FontAwesomeIcon icon={faArrowLeft} className='header-icon-back-icon'/>
      </button>
      
      {/* Título con ícono */}
      <h1 className="class-header-header-icons">
        <FontAwesomeIcon icon={icon} className="header-icon" />
        {title}
      </h1>
      
      {/* Botón para agregar: invisible pero mantiene el espacio */}
      <button 
        onClick={handleAddClick} 
        className="header-icon-add"
        style={{
          opacity: isAddButtonVisible ? 1 : 0,
          pointerEvents: isAddButtonVisible ? 'auto' : 'none'
        }}
      >
        <FontAwesomeIcon icon={faCirclePlus} />
        <span className="header-agregar">Agregar</span>
      </button>
    </div>
  );
};

export default HeaderIcons;
