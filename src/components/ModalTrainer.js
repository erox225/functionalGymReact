import React from 'react'; 
import './css/ModalTrainer.css';

const ModalTrainer = ({ trainer, onClose }) => {
  const description = trainer === 'Miguel Labrador' 
    ? 'Miguel Labrador es un profesional con más de 10 años de experiencia en el sector fitness...'
    : 'Jessica Di Maggio es una entrenadora con gran experiencia en entrenamiento personalizado...';

  const jobs = trainer === 'Miguel Labrador'
    ? ['Entrenador Personal', 'Instructor de clases grupales', 'Consultor de bienestar']
    : ['Especialista en entrenamiento funcional', 'Coach de nutrición', 'Experta en rehabilitación deportiva'];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header-bar">
          <button className="modal-close" onClick={onClose}>X</button>
        </div>
        <div className="modal-header">

          <div>
            <h2 className="modal-title">{trainer}</h2>
            <h5 className="modal-subtitle">Entrenador Personal</h5>
          </div>
        </div>
        <div className="modal-body"> 
        <p className="modal-description">{description}</p>
        <div className="modal-list">
            <div>
                <h4>Mis Objetivos</h4>
                <div className="modal-sub-body">
                    
                    <ul className="modal-job-list">
                    {jobs.map((job, index) => (
                        <li key={index}>{job}</li>
                    ))}
                    </ul>
                </div>
            </div>
            <div>
                <h4>Mis clases favoritas</h4>
                <div className="modal-sub-body">
                    <ul className="modal-job-list">
                    {jobs.map((job, index) => (
                        <li key={index}>{job}</li>
                    ))}
                    </ul>
                </div>
            </div>
            
        </div>


        </div>

      </div>
    </div>
  );
};

export default ModalTrainer;
