import React, { useState } from 'react';
import './css/ReservationTable.css'; // Archivo CSS específico para las tablas de reservas
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faSearch, faClock, faUser, faCalendarAlt, faQrcode, faXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';

// Función para formatear la fecha en el formato "Sáb 20 de Noviembre"
const formatDate = (dateString) => {
  // Si dateString ya está en el formato correcto, no procesar más
  return dateString;
};

const ReservationTable = ({ reservations }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredReservations = reservations.filter((reserva) =>
    `${reserva.clase} ${reserva.cliente}`.toLowerCase().includes(searchTerm)
  );

  const getClassColor = (clase) => {
    switch (clase.toLowerCase()) {
      case 'gimnasio':
        return 'rgba(255, 99, 71, 0.2)'; // Rojo claro
      case 'yoga':
        return 'rgba(50, 205, 50, 0.2)'; // Verde claro
      case 'pilates':
        return 'rgba(30, 144, 255, 0.2)'; // Azul claro
      default:
        return 'rgba(98, 0, 234, 0.2)'; // Púrpura claro por defecto
    }
  };

  return (
    <div className="reservation-list">
      <div className="search-container">
        <h3 className="search-title">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          Barra de Búsqueda
        </h3>
        <input
          type="text"
          placeholder="Buscar por clase o cliente..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <table className="reservation-table">
        <thead>
          <tr>
            <th>ID</th> {/* Nueva columna para ID */}
            <th>IdReserva</th>
            <th>Clase</th>
            <th>Cliente</th>
            <th>Horario Inicio</th>
            <th>Horario Fin</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.map((reserva, index) => (
            <tr key={index}>
              <td>{reserva.id}</td> {/* Mostrar el nuevo campo ID */}
              <td>{reserva.idReserva}</td>
              <td>{reserva.clase}</td>
              <td>{reserva.cliente}</td>
              <td>{reserva.horarioInicio}</td>
              <td>{reserva.horarioFin}</td>
              <td>
                <div className="action-buttons">
                  <Link to={`/view-reservation/${reserva.id}`} className="view-button">
                    <FontAwesomeIcon icon={faEye} />
                  </Link>
                  <Link to={`/edit-reservation/${reserva.id}`} className="edit-button">
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredReservations.map((reserva, index) => (
        <div key={index} className="reservation-card">
          {/* Botón de eliminar flotante */}
          <button className="delete-button-floating" onClick={() => console.log(`Eliminar reserva ${reserva.id}`)}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          
          {/* Parte izquierda del ticket (Datos de la reserva) */}
          <div
            className="reservation-card-left"
            style={{ backgroundColor: getClassColor(reserva.clase) }}
          >
            <h4 className="class-id">ID : 312312D</h4>
            <h4 className="class-name">{reserva.clase}</h4>
            <div className="reservation-details">
              <span>
                <FontAwesomeIcon icon={faUser} style={{ marginRight: '0.5em' }} />
                <strong>ID:</strong> {reserva.id} {/* Mostrar el nuevo campo ID */}
              </span>
              <span>
                <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '0.5em' }} />
                <strong>Sala:</strong> 1
              </span>
              <span>
                <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '0.5em' }} />
                <strong>Fecha:</strong> {formatDate(reserva.diaEjecucion)}
              </span>
              <span>
                <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '0.5em' }} />
                <strong>Estado:</strong> Sin usar
              </span>
            </div>
          </div>

          {/* Parte derecha del ticket (Horario y acciones) */}
          <div className="reservation-card-right">
            <div className="reservation-time">
              <span>
                <FontAwesomeIcon icon={faClock} style={{ marginRight: '0.5em' }} />
                <strong>Inicio:</strong> {reserva.horarioInicio}
              </span>
              <span>
                <FontAwesomeIcon icon={faClock} style={{ marginRight: '0.5em' }} />
                <strong>Fin:</strong> {reserva.horarioFin}
              </span>
            </div>
            <div className="qr-button-container">
              <button className="qr-button">
                <FontAwesomeIcon icon={faQrcode} style={{ marginRight: '0.3em' }} />
                <span className="text-ver-qr">Ver QR</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReservationTable;
