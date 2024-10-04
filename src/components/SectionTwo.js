import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faDumbbell, faCheck } from '@fortawesome/free-solid-svg-icons';
import './css/SectionTwo.css';

const SectionTwo = () => {
  const cardContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Índice de la tarjeta/página actual
  const [cardsPerPage, setCardsPerPage] = useState(1); // Cartas visibles por página
  const [numberOfPages, setNumberOfPages] = useState(0); // Total de páginas para los puntos

  // Función para calcular cuántas cartas se ven según el tamaño de pantalla
  const updateCardsPerPage = () => {
    const width = window.innerWidth;
    if (width >= 768) {
      setCardsPerPage(3); // En tablet/desktop mostramos 3 cartas
    } else {
      setCardsPerPage(1); // En móvil mostramos 1 carta
    }
  };

  // Escuchar el redimensionamiento de la ventana para recalcular el número de cartas visibles
  useEffect(() => {
    updateCardsPerPage(); // Calcular al cargar el componente
    window.addEventListener('resize', updateCardsPerPage);
    return () => {
      window.removeEventListener('resize', updateCardsPerPage);
    };
  }, []);

  // Calcular el número total de páginas
  useEffect(() => {
    if (cardContainerRef.current) {
      const totalCards = cardContainerRef.current.children.length;
      setNumberOfPages(Math.ceil(totalCards / cardsPerPage)); // Calcular páginas
    }
  }, [cardsPerPage]);

  // Función para desplazar horizontalmente hacia una "página" de cartas específica
  const scrollToPage = (index) => {
    const cardWidth = cardContainerRef.current.children[0].offsetWidth;
    cardContainerRef.current.scrollTo({
      left: cardWidth * index * cardsPerPage, // Desplazar según el número de cartas visibles
      behavior: 'smooth',
    });
    setCurrentIndex(index); // Actualizar el índice actual de la página
  };

  // Efecto para hacer el scroll automático y repetir indefinidamente
  useEffect(() => {
    if (numberOfPages > 0) {
      const interval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % numberOfPages; // Ciclo infinito entre páginas
        scrollToPage(nextIndex);
      }, 5000); // Cambiar cada 5 segundos

      return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonta
    }
  }, [currentIndex, cardsPerPage, numberOfPages]);

  return (
    <section id="section2" className="SectionTwo-why-choose-us">
      <h2 className="SectionTwo-title">PLANES DE SUSCRIPCIÓN</h2>

      {/* Contenedor de las tarjetas con scroll horizontal */}
      <div className="SectionTwo-card-container" ref={cardContainerRef}>

        {/* Plan Premium */}
        <div className="SectionTwo-card">
          <div className="SectionTwo-card-icon">
            <FontAwesomeIcon icon={faDumbbell} />
          </div>
          <div className="SectionTwo-card-content">
            <h3 className="SectionTwo-card-title">Plan Premium</h3>
            <p className="SectionTwo-card-text">
              50€ + Matrícula 30€
            </p>
            <ul className="SectionTwo-card-features">
              <li><FontAwesomeIcon icon={faCheck} /> Acceso a todas las clases (podrás reservar una clase y al finalizar tendrás acceso a otra reserva del mismo día)</li>
              <li><FontAwesomeIcon icon={faCheck} /> Plan de alimentación básico que se actualizará cada 3 meses</li>
              <li><FontAwesomeIcon icon={faCheck} /> +Más taller de postura</li>
            </ul>
          </div>
        </div>

        {/* Plan Matutino */}
        <div className="SectionTwo-card">
          <div className="SectionTwo-card-icon">
            <FontAwesomeIcon icon={faDumbbell} />
          </div>
          <div className="SectionTwo-card-content">
            <h3 className="SectionTwo-card-title">Plan Matutino</h3>
            <p className="SectionTwo-card-text">
              40€ + Matrícula 30€
            </p>
            <ul className="SectionTwo-card-features">
              <li><FontAwesomeIcon icon={faCheck} /> Acceso a todas las clases en la mañana (podrás reservar una clase y al finalizar tendrás acceso a otra reserva matutina del mismo día)</li>
              <li><FontAwesomeIcon icon={faCheck} /> Plan de alimentación básico que se actualizará cada 3 meses</li>
              <li><FontAwesomeIcon icon={faCheck} /> Más taller de postura</li>
            </ul>
          </div>
        </div>

        {/* Plan 3 Sesiones */}
        <div className="SectionTwo-card">
          <div className="SectionTwo-card-icon">
            <FontAwesomeIcon icon={faDumbbell} />
          </div>
          <div className="SectionTwo-card-content">
            <h3 className="SectionTwo-card-title">Plan 3 Sesiones a la Semana</h3>
            <p className="SectionTwo-card-text">
              34.90€ + Matrícula 30€
            </p>
            <ul className="SectionTwo-card-features">
              <li><FontAwesomeIcon icon={faCheck} /> Acceso a cualquier hora 3 sesiones a la semana</li>
            </ul>
          </div>
        </div>

        {/* Plan Estudiantil */}
        <div className="SectionTwo-card">
          <div className="SectionTwo-card-icon">
            <FontAwesomeIcon icon={faDumbbell} />
          </div>
          <div className="SectionTwo-card-content">
            <h3 className="SectionTwo-card-title">Plan Estudiantil</h3>
            <p className="SectionTwo-card-text">
              34.90€ Matrícula gratis
            </p>
            <ul className="SectionTwo-card-features">
              <li><FontAwesomeIcon icon={faCheck} /> No podrás acceder a la franja horaria marcada en color gris</li>
              <li><FontAwesomeIcon icon={faCheck} /> Acceso a taller de postura</li>
            </ul>
          </div>
        </div>

        {/* Plan Corporativo */}
        <div className="SectionTwo-card">
          <div className="SectionTwo-card-icon">
            <FontAwesomeIcon icon={faDumbbell} />
          </div>
          <div className="SectionTwo-card-content">
            <h3 className="SectionTwo-card-title">Plan Corporativo (2 personas)</h3>
            <p className="SectionTwo-card-text">
              34.90€ + Matrícula 15€
            </p>
            <ul className="SectionTwo-card-features">
              <li><FontAwesomeIcon icon={faCheck} /> No podrás acceder a la franja horaria marcada en color gris</li>
            </ul>
          </div>
        </div>

        {/* Plan Familiar */}
        <div className="SectionTwo-card">
          <div className="SectionTwo-card-icon">
            <FontAwesomeIcon icon={faDumbbell} />
          </div>
          <div className="SectionTwo-card-content">
            <h3 className="SectionTwo-card-title">Plan Familiar</h3>
            <p className="SectionTwo-card-text">
              Paga 50% de matrícula y escoge tu plan
            </p>
          </div>
        </div>

      </div>

      {/* Barra de navegación en la parte inferior */}
      <div className="SectionTwo-nav">
        {Array.from({ length: numberOfPages }).map((_, i) => (
          <span
            key={i}
            className={`SectionTwo-nav-dot ${currentIndex === i ? 'active' : ''}`}
            onClick={() => scrollToPage(i)}
          />
        ))}
      </div>
    </section>
  );
};

export default SectionTwo;
