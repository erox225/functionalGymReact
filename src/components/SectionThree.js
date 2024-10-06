import React, { useState, useEffect, useRef } from 'react';
import ModalTrainer from './ModalTrainer';
import './css/SectionThree.css'; // Archivo CSS separado para los estilos

const SectionThree = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Para el carrusel de imágenes
  const [touchStart, setTouchStart] = useState(null); // Para manejar el deslizamiento táctil
  const timeoutRef = useRef(null);

  const handleOpenModal = (trainer) => {
    setSelectedTrainer(trainer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTrainer(null);
  };

  // Para el deslizamiento táctil
  const handleTouchStart = (e) => {
    const touchStartX = e.touches[0].clientX;
    setTouchStart(touchStartX); // Asignar el valor inicial del toque
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;
    const touchEndX = e.touches[0].clientX;
    if (touchStart - touchEndX > 50) {
      nextSlide(); // Deslizar a la derecha
    }
    if (touchStart - touchEndX < -50) {
      prevSlide(); // Deslizar a la izquierda
    }
  };

  // Controlar el cambio automático de las imágenes
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, 5000); // Cada 5 segundos

    return () => {
      resetTimeout();
    };
  }, [currentIndex]);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 5); // Número de imágenes en el carrusel
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 4 : prevIndex - 1)); // Número de imágenes en el carrusel
  };

  return (
    <section className="section-three">
      <div className="section-three-container">
        {/* Segunda sección - QUIENES SOMOS */}
        <div className="section-three-image clickable" onClick={() => handleOpenModal('Miguel Labrador')}>
          <div className="trainer-image trainer-one"></div>
          <p className="section-three-trainer-name">Miguel Labrador</p>
        </div>
        <div className="section-three-image clickable" onClick={() => handleOpenModal('Jessica Di Maggio')}>
          <div className="trainer-image trainer-two"></div>
          <p className="section-three-trainer-name">Jessica Di Maggio</p>
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

        {/* Carrusel de imágenes */}
        <div className="carousel-container" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
          {[0, 1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className={`carousel-slide slide-${index} ${index === currentIndex ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <ModalTrainer trainer={selectedTrainer} onClose={handleCloseModal} />}
    </section>
  );
};

export default SectionThree;
