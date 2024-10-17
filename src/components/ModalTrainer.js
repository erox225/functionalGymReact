import React from 'react'; 
import './css/ModalTrainer.css';

const ModalTrainer = ({ trainer, onClose }) => {
  const description = trainer === 'Miguel Labrador' 
    ? 'Miguel Labrador es un profesional con más de 10 años de experiencia en el sector fitness...'
    : 'Guiar a mis alumnos en el entrenamiento y conocerlos de forma personalizada, dedicandoles el tiempo que necesitan, para ayudarles con sus preocupaciones, lesiones, sus miedos y aumentar la confianza en sí mismos.';

  const jobs = trainer === 'Miguel Labrador'
    ? ['Body Combat', 'Cross Training', 'TrainNow']
    : ['TrainNow', 'Balance', 'Body Combat'];

 const modalContentTrainer = trainer === 'Miguel Labrador' 
    ? 'modal-content-miguel'
    : 'modal-content-jessica'

    const getTipoClass = (tipo) => {
      switch (tipo) {
        case 'TrainNow': return 'tipo-fuerza-modal-trainer';
        case 'Body Combat': return 'tipo-mente-modal-trainer';
        case 'Balance': return 'tipo-mente-modal-trainer';
        case 'Cross Training': return 'tipo-mente-modal-trainer';
        default: return '';
      }
    };

  return (
    <div className="modal-overlay">
      <div className={modalContentTrainer}>
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
          <h3 className="objetivo-trainer-text">Mi Objetivo</h3>
        <p className="modal-description">{description}</p>
        <div className="modal-list">
            <div className="modal-trainer-clases-favoritas-box">
                <h4>Clases favoritas</h4>
                <div className="modal-sub-body">
                    <ul className="modal-job-list">
                    {jobs.map((job, index) => (
                        <li className={getTipoClass(job)} key={index}>{job}</li>
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
