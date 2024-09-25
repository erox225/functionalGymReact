import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChalkboardTeacher, faUserFriends, faClipboardList, faLock, faCogs } from '@fortawesome/free-solid-svg-icons'; // Importamos los iconos
import './css/GridDashboard.css';

const GridDashboard = () => {
  return (
    <div className="grid-container">
      <Link to="/calendar" className="grid-item">
        <FontAwesomeIcon icon={faCalendarAlt} className="grid-icon" />
        <span>Calendario</span>
      </Link>
      <Link to="/class" className="grid-item">
        <FontAwesomeIcon icon={faChalkboardTeacher} className="grid-icon" />
        <span>Clases</span>
      </Link>
      <Link to="/clients" className="grid-item">
        <FontAwesomeIcon icon={faUserFriends} className="grid-icon" />
        <span>Clientes</span>
      </Link>
      <Link to="/reservations" className="grid-item">
        <FontAwesomeIcon icon={faClipboardList} className="grid-icon" />
        <span>Reservas</span>
      </Link>
      <Link to="/accessControl" className="grid-item">
        <FontAwesomeIcon icon={faLock} className="grid-icon" />
        <span>Control de acceso</span>
      </Link>
      <Link to="/configurations" className="grid-item">
        <FontAwesomeIcon icon={faCogs} className="grid-icon" />
        <span>Configuraciones</span>
      </Link>
    </div>
  );
};

export default GridDashboard;
