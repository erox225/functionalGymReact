import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCalendar, faCheckCircle, faTimesCircle, faClipboardList, faSearch } from '@fortawesome/free-solid-svg-icons';
import './css/ClientAccess.css'; // Importa los estilos

const ClientAccess = ({ clients }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtrar los clientes por el ID ingresado en el buscador
  const filteredClients = clients.filter((client) =>
    client.id.toString().includes(searchTerm)
  );

  return (
    <div className="client-access-list">
      {/* Barra de búsqueda */}
      <div className="client-access-search-container">
        <h3 className="client-access-search-title">
          <FontAwesomeIcon icon={faSearch} className="client-access-search-icon" />
          Buscar por ID de Cliente
        </h3>
        <input
          type="text"
          placeholder="Ingresa ID de cliente..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="client-access-search-input"
        />
      </div>

<div className='client-access-list-2'>
      {/* Listado de clientes filtrados */}
      {filteredClients.map((client, index) => (
        <div key={index} className="client-access-card">
          <div className="client-access-card-header">
            <div  className="client-access-cliente">
            <FontAwesomeIcon icon={faCalendar} className="client-access-icon" />
            Cliente: <span className="client-access-id">{client.id}</span>
            </div>
            
            <div className="client-access-fecha">
              <span className="client-access-value client-access-fecha">{client.fecha}</span>
            </div>
            
          </div>
          <div className="client-access-card-content">
            <div className="client-access-item">
              <FontAwesomeIcon icon={faUsers} className="client-access-icon" />
              <span className="client-access-attribute client-access-attribute-name">Estancia:</span>
              <span className="client-access-value client-access-nombre-estancia">{client.nombreEstancia}</span>
            </div>
            <div className="client-access-item">
              <FontAwesomeIcon icon={faClipboardList} className="client-access-icon" />
              <span className="client-access-attribute client-access-attribute-reserva">Reserva:</span>
              <span className="client-access-value client-access-reserva">{client.reserva}</span>
            </div>
            <div className="client-access-item">
              <FontAwesomeIcon icon={client.resultado === 'Aprobado' ? faCheckCircle : faTimesCircle} className="client-access-icon" />
              <span className="client-access-attribute client-access-attribute-result">Resultado:</span>
              <span className={`client-access-value ${client.resultado.toLowerCase()}`}>{client.resultado}</span>
            </div>

          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default ClientAccess;
