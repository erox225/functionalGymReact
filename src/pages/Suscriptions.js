import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'; // Ícono para reservas

const Suscriptions = () => {
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
