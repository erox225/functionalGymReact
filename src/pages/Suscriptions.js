import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'; // Ícono para reservas
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Suscriptions = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    navigate(-1); // Navega a la página anterior
  };

  return (
    <div>
      {/* Título con ícono */}
      <h1 className="class-header">
        <FontAwesomeIcon icon={faClipboardList} className="header-icon" />
        Suscripciones
      </h1>

    </div>
  );
};

export default Suscriptions;
