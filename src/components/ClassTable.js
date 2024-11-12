import React, { useState, useEffect } from 'react';
import './css/ClassTable.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faSearch, faClock, faBolt, faUsers, faCheckCircle, faTimesCircle, faPalette } from '@fortawesome/free-solid-svg-icons';

// Función simulada para obtener los estados de las clases
const fetchEstadosClases = async () => {
  return [
    { id: true, nombre: 'Disponible', color: 'green' },
    { id: false, nombre: 'En borrador', color: 'gray' }
  ];
};

const ClassTable = ({ classes }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [estados, setEstados] = useState([]);

  // Función para manejar cambios en el input de búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Cargar los estados de clases al montar el componente
  useEffect(() => {
    fetchEstadosClases().then((data) => setEstados(data));
  }, []);

  // Obtener color del estado
  const getEstadoColor = (estado) => {
    const estadoObj = estados.find((e) => e.id === estado);
    return estadoObj ? estadoObj.color : '#000';
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
            <th>Color</th>
            <th>Última Modificación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredClasses.map((clase, index) => (
            <tr key={index}>
              <td>{clase.name}</td>
              <td>{clase.aforoMax}</td>
              <td style={{ color: getEstadoColor(clase.estado) }}>
                {clase.estado ? "Disponible" : "En borrador"}
              </td>
              <td>
                <span style={{ color: clase.color }}>
                  <FontAwesomeIcon icon={faPalette} style={{ marginRight: '0.3em' }} />
                  {clase.color}
                </span>
              </td>
              <td>{clase.ultimaModificacion}</td>
              <td>
                <div className="action-buttons">
                <Link to={`/clase/${clase.id}`} className="edit-button">
              <FontAwesomeIcon icon={faEdit} />
              <span className="edit-button-text"> Editar </span> 
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
            <span>
              <FontAwesomeIcon icon={faBolt} style={{ marginRight: '0.5em' }} />
              <strong>Intensidad:</strong> 
              <span style={{ textTransform: 'uppercase', fontWeight: 'bold', display: 'inline-block', marginBottom: '0px', marginLeft: '0.3em' }}> {clase.intensidad}</span>
            </span>
            <span>
              <FontAwesomeIcon icon={faClock} style={{ marginRight: '0.5em' }} />
              <strong>Duración:</strong> 
              <span style={{ textTransform: 'uppercase', fontWeight: 'bold', display: 'inline-block', marginBottom: '0px', marginLeft: '0.3em' }}> {clase.duracion}</span>
            </span>
            <span>
              <FontAwesomeIcon icon={faUsers} style={{ marginRight: '0.5em' }} />
              <strong>Aforo Máximo:</strong> {clase.aforoMax}
            </span>
            <span>
              <FontAwesomeIcon icon={clase.estado ? faCheckCircle : faTimesCircle} style={{ marginRight: '0.5em', color: getEstadoColor(clase.estado) }} />
              <strong>Estado:</strong> {clase.estado ? "Disponible" : "En borrador"}
            </span>
            <span>
              <FontAwesomeIcon icon={faPalette} style={{ marginRight: '0.5em', color: clase.color }} />
              <strong>Color:</strong> {clase.color}
            </span>
            <span><strong>Descripción:</strong> {clase.descripcion}</span>
          </div>
          <div className="action-buttons">
            <Link to={`/clase/${clase.id}`} className="edit-button">
              <FontAwesomeIcon icon={faEdit} />
              <span className="edit-button-text"> Editar </span> 
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClassTable;
