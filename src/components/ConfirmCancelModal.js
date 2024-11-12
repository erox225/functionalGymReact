// ConfirmCancelModal.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import './css/ConfirmCancelModal.css';

const ConfirmCancelModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content-confirm-cancel">
        <div className="modal-header-confirmar-cancelacion">
          <FontAwesomeIcon icon={faExclamationTriangle} className="modal-warning-icon" />
          <h3 className='titulo-confirmar-cancelacion'>Confirmar Cancelación</h3>
        </div>
        <p className='texto-confirmar-cancelacion'>¿Estás seguro de que deseas cancelar esta clase?</p>
        <div className="modal-buttons">
        <button onClick={onClose} className="cancel-button">Cerrar</button>
          <button onClick={onConfirm} className="confirm-button">Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCancelModal;
