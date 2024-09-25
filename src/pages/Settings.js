import React from 'react';
import ConfigCard from '../components/ConfigCard'; // Importa el componente ConfigCardç
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'; // Ícono para reservas

const Settings = () => {

      // Simulación de datos de configuración
  const configs = [
    { name: 'Versión', value: '1.0.0' },
    { name: 'Idioma', value: 'Español' },
    { name: 'Tema', value: 'Oscuro' },
    { name: 'Actualizaciones Automáticas', value: 'Habilitadas' },
  ];

  return (
    <div>
      {/* Título con ícono */}
      <h1 className="class-header">
        <FontAwesomeIcon icon={faClipboardList} className="header-icon" />
        Configuraciones
      </h1>
      < ConfigCard configs= {configs} />
    </div>
  );
};

export default Settings;
