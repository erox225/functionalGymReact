import React, { useState } from 'react';
import './css/ClientTable.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash, faSearch, faEnvelope, faUser, faIdCard, faCheckCircle, faTimesCircle, faPaperPlane, faPhone, faCalendarDay, faRedo } from '@fortawesome/free-solid-svg-icons';

const subscriptionColors = {
  "Plan premium": "#007bff",       
  "Plan matutino": "#6c757d",      
  "Plan 12 sesiones a la semana": "#28a745",
  "Plan estudiantil": "#ff6f61",   
  "Plan corporativo": "#ffc107",   
  "Plan Familiar": "#8e44ad"       
};

const stateColors = {
  "activo": "green",
  "baja": "red",
  "usuario no activo": "orange"
};

// Formato para el número de teléfono
const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  return phone.replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3');
};

// Formato de fecha con dd/mm/yyyy o "Indefinido" para fechas nulas
const formatDate = (dateString) => {
  if (!dateString) return 'Indefinido';
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
};

// Función que verifica si la fecha está en el pasado
const isDateInPast = (date) => {
  const today = new Date();
  const dateObj = new Date(date);
  return dateObj < today;
};

const ClientTable = ({ clients }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredClients = clients.filter((client) =>
    `${client.nombre} ${client.apellido}`.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="client-list">
      <div className="search-container">
        <h3 className="search-title">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          Barra de Búsqueda
        </h3>
        <input
          type="text"
          placeholder="Buscar por nombre o apellido..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <table className="client-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Suscripción</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map((client, index) => {
            const isInactive = client.fechaFin && isDateInPast(client.fechaFin) || client.estado.toLowerCase() === 'baja';
            return (
              <tr key={index} className={isInactive ? 'disabled-row' : ''}>
                <td>{client.id}</td>
                <td>{client.nombre}</td>
                <td>{client.apellido}</td>
                <td>{client.email}</td>
                <td style={{ color: subscriptionColors[client.suscripcion] || "#000" }}>
                  {client.suscripcion}
                </td>
                <td style={{ color: stateColors[client.estado.toLowerCase()] || "#000" }}>
                  {client.estado}
                </td>
                <td>
                  <div className="action-buttons">
                    <Link to={`/view/${client.id}`} className="view-button">
                      <FontAwesomeIcon icon={faEye} />
                    </Link>
                    <Link to={`/edit/${client.id}`} className="edit-button">
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
                    <button className="delete-button" onClick={() => console.log(`Eliminar cliente ${client.id}`)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    {isInactive && (
                      <button className="reactivate-button" onClick={() => console.log(`Reactivar cliente ${client.id}`)}>
                        <FontAwesomeIcon icon={faRedo} /> Reactivar
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {filteredClients.map((client, index) => {
        const isInactive = client.fechaFin && isDateInPast(client.fechaFin) || client.estado.toLowerCase() === 'baja';
        return (
          <div key={index} className={`client-card ${isInactive ? 'disabled-card' : ''}`}>
            <div className="client-image-container">
              <img
                src={client.imagenUrl || ''}
                alt={`${client.nombre} ${client.apellido}`}
                className={`client-image ${
                  client.estado.toLowerCase() === 'activo'
                    ? 'border-green'
                    : client.estado.toLowerCase() === 'baja'
                    ? 'border-red'
                    : 'border-orange'
                }`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className={`client-default-icon ${client.estado.toLowerCase() === 'activo' ? 'border-green' : 'border-red'}`}>
                <FontAwesomeIcon icon={faUser} />
              </div>
            </div>
            <div className="client-card-header">{client.nombre} {client.apellido}</div>
            <div className="client-card-sub-header" style={{ color: subscriptionColors[client.suscripcion] || "#000" }}>
              {client.suscripcion}
            </div>
            <div className="client-card-content">
              <span>
                <FontAwesomeIcon icon={faIdCard} style={{ marginRight: '0.5rem' }} />
                <strong>ID:</strong> {client.id}
              </span>
              <span>
                <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '0.5rem' }} />
                <strong>Email:</strong> {client.email}
              </span>
              <span>
                <FontAwesomeIcon icon={faCalendarDay} style={{ marginRight: '0.5rem' }} />
                <strong>Fec Nacimiento:</strong> {formatDate(client.fechaNacimiento)}
              </span>
              <span>
                <FontAwesomeIcon
                  icon={client.estado.toLowerCase() === 'activo' ? faCheckCircle : faTimesCircle}
                  style={{ marginRight: '0.5rem', color: stateColors[client.estado.toLowerCase()] || 'black' }}
                />
                <strong>Estado:</strong> {client.estado}
              </span>
              <span>
                <FontAwesomeIcon icon={faPhone} style={{ marginRight: '0.5rem' }} />
                <strong>Teléfono:</strong> {formatPhoneNumber(client.telefono)}
              </span>
              <span>
                <FontAwesomeIcon icon={faCalendarDay} style={{ marginRight: '0.5rem' }} />
                <strong>Alta:</strong> {formatDate(client.fechaInicio)}
              </span>
              <span>
                <FontAwesomeIcon icon={faCalendarDay} style={{ marginRight: '0.5rem' }} />
                <strong>Baja:</strong> {formatDate(client.fechaFin)}
              </span>
            </div>
            <div className="action-buttons">
              <Link to={`/cliente/${client.id}`} className="edit-button">
                <FontAwesomeIcon icon={faEdit} />
                <span className="view-button-text"> Editar </span>
              </Link>
              {!isInactive && (
                <Link className="send-user-button">
                  <FontAwesomeIcon icon={faPaperPlane} />
                  <span className="edit-button-text"> Enviar Usuario </span> 
                </Link>
              )}
              {isInactive && (
                <Link className="reactivate-button" onClick={() => console.log(`Reactivar cliente ${client.id}`)}>
                  <FontAwesomeIcon icon={faRedo} /> Reactivar
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ClientTable;
