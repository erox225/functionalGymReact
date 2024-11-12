// ReactivateModal.js
import React, { useState } from 'react';
import './css/ReactiveModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

const ReactivateModal = ({ isOpen, onClose, onConfirm }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleConfirm = () => {
    onConfirm(startDate, endDate);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content-reactivate-modal">
        <p className="modal-content-reactivate-modal-title">Reactivar Cliente</p>
        <label className="modal-content-reactivate-modal-label">
          Fecha de Inicio:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label className="modal-content-reactivate-modal-label">
          Fecha de Fin:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <div className="modal-content-reactivate-modal-box-button">
          <button onClick={onClose} className="modal-close-button-reactivate">
            <FontAwesomeIcon icon={faTimes} style={{ marginRight: '0.5rem' }} />
            Cancelar
          </button>
          <button onClick={handleConfirm} className="modal-confirm-button-reactivate">
            <FontAwesomeIcon icon={faCheck} style={{ marginRight: '0.5rem' }} />
            Reactivar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReactivateModal;
