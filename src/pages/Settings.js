import React from 'react';
import ConfigCard from '../components/ConfigCard'; // Importa el componente ConfigCard
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'; // Ícono para configuraciones
import { useNavigate } from 'react-router-dom';
import HeaderIcons from '../components/HeaderIcons'; // Importamos el componente HeaderIcons

const Settings = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navega a la página anterior
  };

  // Simulación de datos de configuración
  const configs = [
    { name: 'Versión', value: '1.0.0' },
    { name: 'Idioma', value: 'Español' },
    { name: 'Tema', value: 'Oscuro' },
    { name: 'Actualizaciones Automáticas', value: 'Habilitadas' },
  ];

  return (
    <div>
      {/* Usamos el componente HeaderIcons y le pasamos los props sin onAddClick */}
      <HeaderIcons 
        title="Configuraciones"
      />

      {/* Renderiza el componente ConfigCard con los datos de configuración */}
      <ConfigCard configs={configs} />
    </div>
  );
};

export default Settings;
