import React from 'react';
import './css/ModalContentReservations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const ReservationModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content-reservations">
        {children}
        <button onClick={onClose} className="modal-close-button">
          <FontAwesomeIcon icon={faTimesCircle} className="modal-close-icon" />
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ReservationModal;
