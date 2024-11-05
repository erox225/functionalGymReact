import React, { useState } from 'react';
import './css/ReservationTable.css'; 
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faSearch, faClock, faUser, faCalendarAlt, faQrcode, faXmark, faLocationDot, faCheckCircle, faTimesCircle, faHourglassHalf, faRedo } from '@fortawesome/free-solid-svg-icons';
import ReservationModal from './ReservationModal';
import QrModal from './QrModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const formatDate = (dateString) => dateString;

const ReservationTable = ({ reservations: initialReservations }) => {
  const [reservations, setReservations] = useState(initialReservations);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [isQrModalOpen, setQrModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [qrData, setQrData] = useState(null);
  const [queuePosition, setQueuePosition] = useState(0);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleReload = async () => {
    try {
      const response = await fetch('https://api.example.com/reservations');
      const newReservations = await response.json();
      setReservations(newReservations);
    } catch (error) {
      console.error('Error al obtener las reservas:', error);
    }
  };

  const filteredReservations = reservations.filter((reserva) =>
    `${reserva.clase} ${reserva.cliente}`.toLowerCase().includes(searchTerm)
  );

  const getStatusIconAndColor = (status) => {
    switch (status) {
      case 'INSCRITO':
        return { icon: faCheckCircle, color: '#4CAF50' };
      case 'REALIZADO':
        return { icon: faCheckCircle, color: '#000080' };
      case 'CANCELADO':
        return { icon: faTimesCircle, color: '#f44336' };
      case 'EN COLA':
        return { icon: faHourglassHalf, color: '#FF9800' };
      default:
        return { icon: faClock, color: '#03A9F4' };
    }
  };

  const getClassColor = (clase) => {
    switch (clase.toLowerCase()) {
      case 'gimnasio':
        return 'rgba(255, 99, 71, 0.2)';
      case 'yoga':
        return 'rgba(50, 205, 50, 0.2)';
      case 'pilates':
        return 'rgba(30, 144, 255, 0.2)';
      default:
        return 'rgba(98, 0, 234, 0.2)';
    }
  };

  const getCardClass = (status) => {
    return status === 'REALIZADO' || status === 'CANCELADO' ? 'reservation-card disabled-card' : 'reservation-card';
  };

  const handleQueueClick = (position) => {
    setQueuePosition(position);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const openQrModal = (qrData) => {
    setQrData(qrData);
    setQrModalOpen(true);
  };

  const closeQrModal = () => setQrModalOpen(false);

  const openDeleteModal = (reservation) => {
    setSelectedReservation(reservation);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => setDeleteModalOpen(false);

  const handleDeleteConfirmation = () => {
    setReservations(reservations.filter(reserva => reserva.id !== selectedReservation.id));
    setDeleteModalOpen(false);
  };

  return (
    <div className="reservation-list">
      <div className="search-container-reserva">
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
      <div className='reload-button-container'>
        <button className="reload-button" onClick={handleReload}>
                <FontAwesomeIcon icon={faRedo} /> <span className='reload-button-text'>Actualizar</span> 
        </button>
      </div>
      <table className="reservation-table">
        <thead>
          <tr>
            <th>ID</th>
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
              <td>{reserva.id}</td>
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
        <div key={index} className={getCardClass(reserva.estado)}>
          {['INSCRITO', 'EN COLA'].includes(reserva.estado) && !isQrModalOpen && (
            <button className="delete-button-floating" onClick={() => openDeleteModal(reserva)}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          )}

          <div className="reservation-card-left" style={{ backgroundColor: getClassColor(reserva.clase) }}>
            <h4 className="class-id">ID : {reserva.idReserva}</h4>
            <h4 className="class-name">{reserva.clase}</h4>
            <div className="reservation-details">
              <span>
                <FontAwesomeIcon icon={faUser} style={{ marginRight: '0.5em' }} />
                <strong>ID:</strong> {reserva.id}
              </span>
              <span>
                <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '0.5em' }} />
                <strong>Sala:</strong> {reserva.sala || 'N/A'}
              </span>
              <span>
                <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '0.5em' }} />
                <strong>Fecha:</strong> {formatDate(reserva.diaEjecucion)}
              </span>
              <span
                onClick={() => reserva.estado === 'EN COLA' && handleQueueClick(reserva.queuePosition)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: getStatusIconAndColor(reserva.estado).color,
                  cursor: reserva.estado === 'EN COLA' ? 'pointer' : 'default',
                }}
              >
                <FontAwesomeIcon icon={getStatusIconAndColor(reserva.estado).icon} style={{ marginRight: '0.5rem' }} />
                <strong>{reserva.estado}</strong> 
              </span>
            </div>
          </div>

          <div className="reservation-card-right">
            <div className="reservation-time">
              <span className='reservation-span'>  
                <strong>Inicio</strong>
                <span>
                  <FontAwesomeIcon icon={faClock} style={{ marginRight: '0.2em' }} />
                  {reserva.horarioInicio}
                </span>
              </span>
              <span className='reservation-span'>  
                <strong>Duración</strong>
                <span>
                  <FontAwesomeIcon icon={faClock} style={{ marginRight: '0.2em' }} />
                  {reserva.duracion}'
                </span>
              </span>
            </div>
            <div className="qr-button-container">
              <button
                className={`qr-button ${reserva.estado !== 'INSCRITO' ? 'qr-button-disabled' : ''}`}
                disabled={reserva.estado !== 'INSCRITO'}
                onClick={() => reserva.estado === 'INSCRITO' && openQrModal(reserva.idReserva)}
              >
                <FontAwesomeIcon icon={faQrcode} />
                <span className="text-ver-qr">Ver QR</span>
              </button>
            </div>
          </div>
        </div>
      ))}

      {isQrModalOpen && (
        <QrModal qrData={qrData} onClose={closeQrModal} />
      )}

      <ReservationModal isOpen={isModalOpen} onClose={closeModal}>
        <h3>Posición en la Cola</h3>
        <p>Hay {queuePosition} personas delante de ti en la cola.</p>
      </ReservationModal>

      <ConfirmDeleteModal 
        isOpen={isDeleteModalOpen} 
        onClose={closeDeleteModal} 
        onConfirm={handleDeleteConfirmation} 
        reservation={selectedReservation} 
      />
    </div>
  );
};

export default ReservationTable;
