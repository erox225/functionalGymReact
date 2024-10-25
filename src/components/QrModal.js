import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';  // Cambia la importación a QRCodeCanvas
import './css/QrModal.css';  // Estilos específicos para el modal

const QrModal = ({ qrData, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Código QR de la reserva</h3>
        {/* Usamos QRCodeCanvas para generar el QR */}
        <QRCodeCanvas value={qrData} size={256} /> {/* El tamaño 256 es opcional, puedes ajustarlo */}
        <button onClick={onClose} className="close-button">Cerrar</button>
      </div>
    </div>
  );
};

export default QrModal;
