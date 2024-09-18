import React, { useState } from 'react';
import './css/ClassTable.css'; // Importa el archivo CSS
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faSearch } from '@fortawesome/free-solid-svg-icons';

const ClassTable = ({ classes }) => {
  // Estado para almacenar el término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // Función para manejar cambios en el input de búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filtrar las clases basándose en el nombre y el término de búsqueda
  const filteredClasses = classes.filter((clase) =>
    clase.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="class-list">
      {/* Contenedor de la barra de búsqueda */}
      <div className="search-container">
        <h3 className="search-title">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          Barra de Búsqueda
        </h3>
        <input
          type="text"
          placeholder="Buscar por nombre de clase..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {/* Versión de tabla para pantallas grandes */}
      <table className="class-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Aforo Máximo</th>
            <th>Estado</th>
            <th>Última Modificación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredClasses.map((clase, index) => (
            <tr key={index}>
              <td>{clase.name}</td>
              <td>{clase.aforoMax}</td>
              <td>{clase.estado}</td>
              <td>{clase.ultimaModificacion}</td>
              <td>
                <div className="action-buttons">
                  <Link to={`/view/${clase.id}`} className="view-button">
                    <FontAwesomeIcon icon={faEye} />
                  </Link>
                  <Link to={`/edit/${clase.id}`} className="edit-button">
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Versión de cartas para pantallas pequeñas */}
      {filteredClasses.map((clase, index) => (
        <div key={index} className="class-card">
          <div className="class-card-header">{clase.name}</div>
          <div className="class-card-content">
            <span><strong>Aforo Máximo:</strong> {clase.aforoMax}</span>
            <span><strong>Estado:</strong> {clase.estado}</span>
            <span><strong>Última Modificación:</strong> {clase.ultimaModificacion}</span>
          </div>
          <div className="action-buttons">
            <Link to={`/view/${clase.id}`} className="view-button">
              <FontAwesomeIcon icon={faEye} />
            </Link>
            <Link to={`/edit/${clase.id}`} className="edit-button">
              <FontAwesomeIcon icon={faEdit} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClassTable;
