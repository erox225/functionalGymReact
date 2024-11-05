import React from 'react';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, reservation }) => {
  if (!isOpen || !reservation) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Confirmar Eliminación</h3>
        <p>¿Estás seguro de que quieres eliminar la reserva de {reservation.clase} para el cliente {reservation.cliente}?</p>
        <div className="modal-actions">
          <button onClick={onClose} className="cancel-button">Cancelar</button>
          <button onClick={onConfirm} className="delete-button">Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
