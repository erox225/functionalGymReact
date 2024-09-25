import React, { useState } from 'react';
import './css/ClientTable.css'; // Ajusta la ruta si es necesario
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash, faSearch, faEnvelope, faUser, faIdCard, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'; // Añadimos faUser

const ClientTable = ({ clients }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Función para manejar cambios en el input de búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filtrar los clientes basándose en el nombre o el apellido
  const filteredClients = clients.filter((client) =>
    `${client.nombre} ${client.apellido}`.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="client-list">
      {/* Contenedor de la barra de búsqueda */}
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

      {/* Versión de tabla para pantallas grandes */}
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
          {filteredClients.map((client, index) => (
            <tr key={index}>
              <td>{client.id}</td>
              <td>{client.nombre}</td>
              <td>{client.apellido}</td>
              <td>{client.email}</td>
              <td>{client.suscripcion}</td>
              <td>{client.estado}</td>
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
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Versión de cartas para pantallas pequeñas */}
      {filteredClients.map((client, index) => (
        <div key={index} className="client-card">
          {/* Imagen circular del cliente con icono de usuario por defecto si la imagen falla */}
          <div className="client-image-container">
            <img
              src={client.imagenUrl || ''} // Colocamos el src con la imagen del cliente o vacío
              alt={`${client.nombre} ${client.apellido}`}
              className={`client-image ${client.estado === 'Activo' ? 'border-green' : 'border-red'}`}
              onError={(e) => {
                e.target.onerror = null; // Evitar bucle si hay fallo
                e.target.style.display = 'none'; // Oculta la imagen si no está disponible
                e.target.nextSibling.style.display = 'flex'; // Muestra el ícono
              }}
            />
            {/* Ícono por defecto para cuando no hay imagen */}
            <div className={`client-default-icon ${client.estado === 'Activo' ? 'border-green' : 'border-red'}`} >
              <FontAwesomeIcon icon={faUser} 
               
              />
            </div>
          </div>
          <div className="client-card-header">{client.nombre} {client.apellido}</div>
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
              <FontAwesomeIcon icon={faUser} style={{ marginRight: '0.5rem' }} />
              <strong>Suscripción:</strong> {client.suscripcion}
            </span>
            <span>
              <FontAwesomeIcon
                icon={client.estado === 'Activo' ? faCheckCircle : faTimesCircle}
                style={{ marginRight: '0.5rem', color: client.estado === 'Activo' ? 'green' : 'red' }}
              />
              <strong>Estado:</strong> {client.estado}
            </span>
          </div>
          <div className="action-buttons">
            <Link to={`/view/${client.id}`} className="view-button">
              <FontAwesomeIcon icon={faEye} />
              <span className="view-button-text"> Ver </span> 
            </Link>
            <Link to={`/edit/${client.id}`} className="edit-button">
              <FontAwesomeIcon icon={faEdit} />
              <span className="view-button-text"> Editar </span> 
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientTable;
