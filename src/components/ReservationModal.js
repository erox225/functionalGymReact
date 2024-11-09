import React from 'react';
import './css/ModalContentReservations.css';

const ReservationModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content-reservations">
        {children}
        <button onClick={onClose} className="modal-close-button">Cerrar</button>
      </div>
    </div>
  );
};

export default ReservationModal;
