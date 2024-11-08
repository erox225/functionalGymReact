import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './css/QrModal.css';

const QrModal = ({ qrData, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content-qr-modal">
        <h3 className='color-qr-modal'>Qr Reserva</h3>
        <QRCodeCanvas value={qrData} size={256} />
        <button onClick={onClose} className="close-button-qr-modal">
        <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '0.5em', fontSize: '1.2em' }} />
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default QrModal;
