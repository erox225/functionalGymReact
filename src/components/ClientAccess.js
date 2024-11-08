import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCalendar, faCheckCircle, faTimesCircle, faClipboardList, faSearch, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import './css/ClientAccess.css'; 
import { useAuth } from '../authContext/AuthContext';

const ClientAccess = ({ clients }) => {
  const { userRole } = useAuth(); // Obtenemos el rol de usuario
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtrar los clientes por el ID si el rol es 1, o por la clase si el rol es 2
  const filteredClients = clients.filter((client) =>
    userRole === 1
      ? client.id.toString().includes(searchTerm) // Búsqueda por ID para role 1
      : client.clase.toLowerCase().includes(searchTerm.toLowerCase()) // Búsqueda por clase para role 2
  );

  return (
    <div className="client-access-list">
      {/* Barra de búsqueda */}
      <div className="client-access-search-container">
        <h3 className="client-access-search-title">
          <FontAwesomeIcon icon={faSearch} className="client-access-search-icon" />
          {userRole === 1 ? 'Buscar por ID de Cliente' : 'Buscar por Clase'} {/* Cambiar título según rol */}
        </h3>
        <input
          type="text"
          placeholder={userRole === 1 ? 'Ingresa ID de cliente...' : 'Ingresa nombre de clase...'}
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
              {/* Condición para ocultar el div si el rol es 2 */}
              {userRole !== 2 && (
                <div className="client-access-cliente">
                  <FontAwesomeIcon icon={faCalendar} className="client-access-icon" />
                  Cliente: <span className="client-access-id">{client.id}</span>
                </div>
              )}
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
              <div className="client-access-item">
                <FontAwesomeIcon icon={faChalkboardTeacher} className="client-access-icon" />
                <span className="client-access-attribute client-access-attribute-clase">Clase:</span>
                <span className="client-access-value client-access-clase">{client.clase}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientAccess;
