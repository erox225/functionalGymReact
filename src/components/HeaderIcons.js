import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './css/HeaderIcons.css'; // CSS específico para el componente si lo necesitas

const HeaderIcons = ({ icon, title, onAddClick }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navega a la página anterior
  };

  return (
    <div className="header-icons">
      {/* Botón para volver */}
      <button onClick={goBack} className="header-icon-back">
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      
      {/* Título con ícono */}
      <h1 className="class-header">
        <FontAwesomeIcon icon={icon} className="header-icon" />
        {title}
      </h1>
      
      {/* Botón para agregar, se mantiene el espacio con visibility:hidden si no se pasa onAddClick */}
      <button 
        onClick={onAddClick} 
        className="header-icon-add"
        style={{ visibility: onAddClick ? 'visible' : 'hidden' }} // Ocultar visualmente, pero mantener el espacio
      >
        <FontAwesomeIcon icon={faCirclePlus} />
        <span className="header-agregar">Agregar</span>
      </button>
    </div>
  );
};

export default HeaderIcons;



