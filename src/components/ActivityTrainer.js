import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBolt, faClock, faEdit, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import ConfirmCancelModal from './ConfirmCancelModal';

const ActivityTrainer = ({ activity, navigate }) => {
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);

  const openCancelModal = () => setCancelModalOpen(true);
  const closeCancelModal = () => setCancelModalOpen(false);

  const handleCancelConfirmation = () => {
    // Lógica para cancelar la clase
    closeCancelModal();
    alert(`La clase ${activity.name} ha sido cancelada.`);
  };

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
          <button onClick={() => navigate(`/planificacion/${activity.id}`)} className="reserve-button">
            <FontAwesomeIcon icon={faEdit} />
            <span className="boton-reservar">Editar</span>
          </button>
          <button onClick={openCancelModal} className="cancel-button-activity-trainer">
            <FontAwesomeIcon icon={faTimesCircle} />
            <span className="boton-reservar">Cancelar</span>
          </button>
        </div>
      </div>

      {/* Modal de confirmación de cancelación */}
      <ConfirmCancelModal
        isOpen={isCancelModalOpen}
        onClose={closeCancelModal}
        onConfirm={handleCancelConfirmation}
      />
    </div>
  );
};

export default ActivityTrainer;
