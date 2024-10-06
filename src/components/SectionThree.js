import React, { useState } from 'react';
import ModalTrainer from './ModalTrainer';
import './css/SectionThree.css'; // Archivo CSS separado para los estilos

const SectionThree = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const handleOpenModal = (trainer) => {
    setSelectedTrainer(trainer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTrainer(null);
  };

  return (
    <section className="section-three">
      <div className="section-three-container">
        {/* Primera sección - INFO */}
        <div className="section-three-info">
          <h2 className="section-three-title">INFO</h2>
          <p className="section-three-description">
            Train now es un estudio fitness que te ofrece una nueva experiencia de clases colectivas,
            estamos dispuestos a llevarte a tu máximo potencial mejorando tu salud física y mental,
            mientras entrenas, aprendes y disfrutas.
          </p>
        </div>
        <div className="section-three-image">
          <img src="/images/fitness-image.jpg" alt="Fitness Training" className="info-image" />
        </div>
      </div>

      <div className="section-three-container">
        {/* Segunda sección - QUIENES SOMOS */}
        <div className="section-three-image clickable" onClick={() => handleOpenModal('Miguel Labrador')}>
          {/* Imagen de fondo definida por CSS */}
          <div className="trainer-image trainer-one"></div>
          <p className='section-three-trainer-name'>Miguel Labrador</p>
        </div>
        <div className="section-three-image clickable" onClick={() => handleOpenModal('Jessica Di Maggio')}>
          {/* Imagen de fondo definida por CSS */}
          <div className="trainer-image trainer-two"></div>
          <p className='section-three-trainer-name'>Jessica Di Maggio</p>
        </div>
        <div className="section-three-info">
          <h2 className="section-three-title">QUIENES SOMOS</h2>
          <p className="section-three-description">
            Contamos con un equipo de profesionales Miguel Labrador y Jessica Di Maggio con más de
            10 años de experiencia en el sector fitness y deportivo, tanto en las clases colectivas
            como entrenamientos personalizados.
          </p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ModalTrainer trainer={selectedTrainer} onClose={handleCloseModal} />
      )}
    </section>
  );
};

export default SectionThree;
