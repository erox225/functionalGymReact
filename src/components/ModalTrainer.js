import React from 'react';
import './css/ModalTrainer.css';

const ModalTrainer = ({ trainer, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>
        <h2>{trainer}</h2>
        {/* Aquí puedes agregar más contenido, como biografía, habilidades, etc. */}
        <p>
          {trainer === 'Miguel Labrador' ? (
            'Miguel Labrador es un profesional con más de 10 años de experiencia en el sector fitness...'
          ) : (
            'Jessica Di Maggio es una entrenadora con gran experiencia en entrenamiento personalizado...'
          )}
        </p>
      </div>
    </div>
  );
};

export default ModalTrainer;
