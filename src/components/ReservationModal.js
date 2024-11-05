import React from 'react';

const ReservationModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <button onClick={onClose} className="modal-close-button">Cerrar</button>
      </div>
    </div>
  );
};

export default ReservationModal;
