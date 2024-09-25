import React, { useState } from 'react';
import './css/ConfigCard.css'; // Importa los estilos

const ConfigCard = ({ configs }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Función para filtrar configuraciones por nombre
  const filteredConfigs = configs.filter((config) =>
    config.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="config-list">
      {/* Barra de búsqueda */}
      <div className="config-search-container">
        <input
          type="text"
          placeholder="Buscar configuración por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="config-search-input"
        />
      </div>

      {/* Mostrar las configuraciones filtradas */}
      {filteredConfigs.map((config, index) => (
        <div key={index} className="config-card">
          <div className="config-card-header">
            {config.name}
          </div>
          <div className="config-card-content">
            {config.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConfigCard;
