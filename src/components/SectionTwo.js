import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faDumbbell, faCheck } from '@fortawesome/free-solid-svg-icons';
import './css/SectionTwo.css';

const SectionTwo = () => {
  const cardContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const updateCardsPerPage = () => {
    const width = window.innerWidth;
    if (width >= 768) {
      setCardsPerPage(3);
    } else {
      setCardsPerPage(1);
    }
  };

  useEffect(() => {
    updateCardsPerPage();
    window.addEventListener('resize', updateCardsPerPage);
    return () => {
      window.removeEventListener('resize', updateCardsPerPage);
    };
  }, []);

  useEffect(() => {
    if (cardContainerRef.current) {
      const totalCards = cardContainerRef.current.children.length;
      setNumberOfPages(Math.ceil(totalCards / cardsPerPage));
    }
  }, [cardsPerPage]);

  const scrollToPage = (index) => {
    const cardWidth = cardContainerRef.current.children[0].offsetWidth;
    cardContainerRef.current.scrollTo({
      left: cardWidth * index * cardsPerPage,
      behavior: 'smooth',
    });
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (numberOfPages > 0) {
      const interval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % numberOfPages;
        scrollToPage(nextIndex);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, cardsPerPage, numberOfPages]);

  return (
    <section id="section2" className="SectionTwo-why-choose-us">
      <h2 className="SectionTwo-title">PLANES DE SUSCRIPCIÓN</h2>

      <div className="SectionTwo-card-container" ref={cardContainerRef}>

        {/* Plan Premium */}
        <div className="SectionTwo-card SectionTwo-card-premium">
          <div className="SectionTwo-card-icon">
            <FontAwesomeIcon icon={faDumbbell} />
          </div>
          <div className="SectionTwo-card-content">
            <h3 className="SectionTwo-card-title">Plan Premium</h3>
            <p className="SectionTwo-card-text">50€ + Matrícula 30€</p>
            <ul className="SectionTwo-card-features">
              <li><FontAwesomeIcon icon={faCheck} /> Acceso a todas las clases</li>
              <li><FontAwesomeIcon icon={faCheck} /> Plan de alimentación básico</li>
              <li><FontAwesomeIcon icon={faCheck} /> +Más taller de postura</li>
            </ul>
            <div className="SectionTwo-card-date">30.11.2022</div>
            <a href="#" className="SectionTwo-card-button">Learn More</a>
          </div>
        </div>

        {/* Plan Matutino */}
        <div className="SectionTwo-card SectionTwo-card-matutino">
          <div className="SectionTwo-card-icon">
            <FontAwesomeIcon icon={faDumbbell} />
          </div>
          <div className="SectionTwo-card-content">
            <h3 className="SectionTwo-card-title">Plan Matutino</h3>
            <p className="SectionTwo-card-text">40€ + Matrícula 30€</p>
            <ul className="SectionTwo-card-features">
              <li><FontAwesomeIcon icon={faCheck} /> Acceso a clases en la mañana</li>
              <li><FontAwesomeIcon icon={faCheck} /> Plan de alimentación básico</li>
              <li><FontAwesomeIcon icon={faCheck} /> +Taller de postura</li>
            </ul>
            <div className="SectionTwo-card-date">30.11.2022</div>
            <a href="#" className="SectionTwo-card-button">Learn More</a>
          </div>
        </div>

        {/* Plan 3 Sesiones */}
        <div className="SectionTwo-card SectionTwo-card-3sesiones">
          <div className="SectionTwo-card-icon">
            <FontAwesomeIcon icon={faDumbbell} />
          </div>
          <div className="SectionTwo-card-content">
            <h3 className="SectionTwo-card-title">Plan 3 Sesiones a la Semana</h3>
            <p className="SectionTwo-card-text">34.90€ + Matrícula 30€</p>
            <ul className="SectionTwo-card-features">
              <li><FontAwesomeIcon icon={faCheck} /> 3 sesiones a la semana</li>
            </ul>
            <div className="SectionTwo-card-date">30.11.2022</div>
            <a href="#" className="SectionTwo-card-button">Learn More</a>
          </div>
        </div>

        {/* Plan Estudiantil */}
        <div className="SectionTwo-card SectionTwo-card-estudiantil">
          <div className="SectionTwo-card-icon">
            <FontAwesomeIcon icon={faDumbbell} />
          </div>
          <div className="SectionTwo-card-content">
            <h3 className="SectionTwo-card-title">Plan Estudiantil</h3>
            <p className="SectionTwo-card-text">34.90€ Matrícula gratis</p>
            <ul className="SectionTwo-card-features">
              <li><FontAwesomeIcon icon={faCheck} /> No acceso a franja horaria gris</li>
              <li><FontAwesomeIcon icon={faCheck} /> Acceso a taller de postura</li>
            </ul>
            <div className="SectionTwo-card-date">30.11.2022</div>
            <a href="#" className="SectionTwo-card-button">Learn More</a>
          </div>
        </div>

        {/* Plan Corporativo */}
        <div className="SectionTwo-card SectionTwo-card-corporativo">
          <div className="SectionTwo-card-icon">
            <FontAwesomeIcon icon={faDumbbell} />
          </div>
          <div className="SectionTwo-card-content">
            <h3 className="SectionTwo-card-title">Plan Corporativo</h3>
            <p className="SectionTwo-card-text">34.90€ + Matrícula 15€</p>
            <ul className="SectionTwo-card-features">
              <li><FontAwesomeIcon icon={faCheck} /> No acceso a franja horaria gris</li>
            </ul>
            <div className="SectionTwo-card-date">30.11.2022</div>
            <a href="#" className="SectionTwo-card-button">Learn More</a>
          </div>
        </div>

        {/* Plan Familiar */}
        <div className="SectionTwo-card SectionTwo-card-familiar">
          <div className="SectionTwo-card-icon">
            <FontAwesomeIcon icon={faDumbbell} />
          </div>
          <div className="SectionTwo-card-content">
            <h3 className="SectionTwo-card-title">Plan Familiar</h3>
            <p className="SectionTwo-card-text">Paga 50% de matrícula y escoge tu plan</p>
            <div className="SectionTwo-card-date">30.11.2022</div>
            <a href="#" className="SectionTwo-card-button">Learn More</a>
          </div>
        </div>

      </div>

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
