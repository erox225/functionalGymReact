import React from 'react';
import './css/ConfirmDeleteModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, reservation }) => {
  if (!isOpen || !reservation) return null;

  return (
    <div className="modal">
      <div className="modal-content-eliminar">
        <h3 className='modal-content-eliminar-titulo'>Eliminar reserva</h3>
        <p className='modal-content-eliminar-descripcion'>
          ¿Estás seguro de que quieres eliminar la reserva de <strong>{reservation.clase}</strong> para el cliente <strong>{reservation.cliente}</strong>?
        </p>
        <div className="modal-actions-confirm-delete-modal">
          <button onClick={onClose} className="cancel-button-confirm-delete-modal">
            <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '0.5em' }} />
            Cancelar
          </button>
          <button onClick={onConfirm} className="delete-button-confirm-delete-modal">
            <FontAwesomeIcon icon={faTrash} style={{ marginRight: '0.5em' }} />
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
