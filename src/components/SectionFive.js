import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './css/SectionFive.css';

const SectionFive = ({ subscriptions }) => {
  const [selectedSubscription, setSelectedSubscription] = useState(subscriptions[0].id); // Selección inicial
  const carouselRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Función para manejar la selección de una tarjeta de suscripción
  const handleCardClick = (id) => {
    setSelectedSubscription(id);
    setIsPaused(true); // Pausar el movimiento del carrusel
  };

  // Animación del carrusel
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        const currentScroll = carouselRef.current.scrollLeft;
        const cardWidth = carouselRef.current.firstChild.offsetWidth;
        carouselRef.current.scrollTo({
          left: currentScroll + cardWidth,
          behavior: 'smooth',
        });
      }, 2000); // Desliza cada 2 segundos

      return () => clearInterval(interval); // Limpiar intervalo al desmontar
    }
  }, [isPaused]);

  return (
    <section className="SectionFive">
      <h2 className="SectionFive-title">¡Inscribete!</h2>

      {/* Formulario */}
      <form className="SectionFive-form">
        {/* Nombre */}
        <div className="SectionFive-form-group">
          <label htmlFor="nombre">Nombre</label>
          <FontAwesomeIcon icon={faUser} className="icon" />
          <input type="text" id="nombre" name="nombre" placeholder="Escribe tu nombre" />
        </div>

        {/* Apellidos */}
        <div className="SectionFive-form-group">
          <label htmlFor="apellidos">Apellidos</label>
          <FontAwesomeIcon icon={faUser} className="icon" />
          <input type="text" id="apellidos" name="apellidos" placeholder="Escribe tus apellidos" />
        </div>

        {/* Carrusel de suscripciones */}
        <div className="SectionFive-form-group">
          <label htmlFor="suscripcion">Suscripción</label>
          <div className="SectionFive-subscription-carousel" ref={carouselRef}>
            <div className="SectionFive-carousel">
              {subscriptions.map((sub) => (
                <div
                  key={sub.id}
                  className={`SectionFive-card ${selectedSubscription === sub.id ? 'selected' : ''}`}
                  onClick={() => handleCardClick(sub.id)}
                >
                  <h3>{sub.title}</h3> {/* Solo muestra el nombre de la suscripción */}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="SectionFive-form-group">
          <label htmlFor="email">Email</label>
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          <input type="email" id="email" name="email" placeholder="Escribe tu email" />
        </div>

        {/* Campo oculto para enviar la suscripción seleccionada */}
        <input type="hidden" name="suscripcion" value={selectedSubscription} />

        {/* Botón de enviar */}
        <button type="submit" className="SectionFive-submit-button">
          Enviar
        </button>
      </form>
    </section>
  );
};

export default SectionFive;
