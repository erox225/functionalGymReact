import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBolt, faClock, faCalendarPlus, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import ReservationModal from './ReservationModal';

const ActivityClient = ({ activity, reservedActivities, reserveActivity, loadingActivityId }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [queuePosition, setQueuePosition] = useState(0);

  const handleReserveClick = async () => {
    if (activity.estado === 'Libre') {
      reserveActivity(activity.id);
    }
  };

  const handleQueueClick = () => {
    setQueuePosition(activity.queuePosition || 0);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div className="activity">
      <div className="activity-details">
        <div className="view-class-button">
          <p className="activity-details-name" style={{ color: activity.color }}>{activity.name}</p>
          <p className="activity-details-name-by">By</p>
          <p className="activity-details-name-trainer">{activity.trainer}</p>
        </div>
        <div className="activity-atributes-card">
          <div
            className="activity-aforo"
            style={{ color: activity.aforoActual >= activity.aforoMax ? '#ff6464' : '#000000' }} // Rojo si el aforo está completo, negro en caso contrario
          >
            <FontAwesomeIcon icon={faUsers} style={{ marginRight: '0.3rem' }} />
            {activity.aforoMax}/{activity.aforoActual}
          </div>
          <div className="activity-intensity" style={{ color: activity.intensityColor }}>
            <FontAwesomeIcon icon={faBolt} style={{ marginRight: '0.3rem' }} />
            {activity.intensidad}
          </div>
        </div>
      </div>
      <div className="right-activity">
        <div className="activity-time">{activity.time}</div>
        <div className="activity-duration">
          <FontAwesomeIcon icon={faClock} style={{ marginRight: '0.3rem' }} />
          {activity.duracion}
        </div>

        <div className="activity-buttons">
          {activity.estado === 'Libre' && (
            <button
              onClick={handleReserveClick}
              className="reserve-button"
              disabled={loadingActivityId === activity.id}
              style={{
                backgroundColor: '#e0f7fa',
                color: '#00796b',
                border: '1px solid #00796b'
              }}
            >
              {loadingActivityId === activity.id ? (
                <div className="loading-circle"></div>
              ) : (
                <>
                  <FontAwesomeIcon icon={faCalendarPlus} />
                  <span className="boton-reservar">Reservar</span>
                </>
              )}
            </button>
          )}

          {activity.estado === 'En cola' && (
            <button
              onClick={handleQueueClick}
              className="reserve-button queue-button"
              style={{
                backgroundColor: '#FF9800',
                color: '#FFFFFF',
                border: '1px solid #d17a00'
              }}
            >
              <FontAwesomeIcon icon={faCalendarPlus} />
              <span className="boton-reservar">En cola</span>
            </button>
          )}

          {activity.estado === 'Inscrito' && (
            <button
              className="reserve-button enrolled-button"
              style={{
                backgroundColor: '#e0f7fa',
                color: '#0288d1',
                border: '1px solid #0288d1',
                cursor: 'default'
              }}
              disabled
            >
              <FontAwesomeIcon icon={faCheckCircle} />
              <span className="boton-reservar">Inscrito</span>
            </button>
          )}
        </div>
      </div>

      <ReservationModal isOpen={isModalOpen} onClose={closeModal}>
        <h3 className="reservations-modal-titulo">Posición en la Cola</h3>
        <p className="reservations-modal-texto">
          Hay <strong>{queuePosition}</strong> personas delante de ti en la cola.
        </p>
      </ReservationModal>
    </div>
  );
};

export default ActivityClient;
