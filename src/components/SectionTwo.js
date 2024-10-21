import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDumbbell, faCheck } from '@fortawesome/free-solid-svg-icons';
import './css/SectionTwo.css';

const SectionTwo = ({ subscriptions }) => {
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
        {/* Recorremos las suscripciones recibidas como parámetro */}
        {subscriptions.map((subscription) => (
          <div key={subscription.id} className={`SectionTwo-card ${subscription.class}`}>
            <div className="SectionTwo-card-icon">
              <FontAwesomeIcon icon={faDumbbell} />
            </div>
            <div className="SectionTwo-card-content">
              <h3 className="SectionTwo-card-title">{subscription.title}</h3>
              <p className="SectionTwo-card-text">{subscription.price}</p>
              <ul className="SectionTwo-card-features">
                {subscription.features.map((feature, index) => (
                  <li key={index}>
                    <FontAwesomeIcon icon={faCheck} /> {feature}
                  </li>
                ))}
              </ul>
              <div className="SectionTwo-card-date">{subscription.date}</div>
              <a href="#" className="SectionTwo-card-button">Learn More</a>
            </div>
          </div>
        ))}
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
