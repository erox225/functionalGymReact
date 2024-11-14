import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faCheck, faInfoCircle, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import './css/SectionTwo.css';

const SectionTwo = ({ subscriptions, onMoreInfo }) => {
  const cardContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const updateCardsPerPage = () => {
    const width = window.innerWidth;
    setCardsPerPage(width >= 768 ? 3 : 1);
  };

  useEffect(() => {
    updateCardsPerPage();
    window.addEventListener('resize', updateCardsPerPage);
    return () => window.removeEventListener('resize', updateCardsPerPage);
  }, []);

  useEffect(() => {
    if (cardContainerRef.current) {
      const totalCards = cardContainerRef.current.children.length;
      setNumberOfPages(Math.ceil(totalCards / cardsPerPage));
    }
  }, [cardsPerPage, subscriptions]);

  const scrollToPage = (index) => {
    const cardWidth = cardContainerRef.current.children[0].offsetWidth;
    cardContainerRef.current.scrollTo({
      left: cardWidth * index * cardsPerPage,
      behavior: 'smooth',
    });
    setCurrentIndex(index);
  };

  useEffect(() => {
    // Solo iniciar auto-desplazamiento en pantallas grandes
    const width = window.innerWidth;
    if (width >= 768) {
      const autoScroll = () => {
        const nextIndex = (currentIndex + 1) % numberOfPages;
        scrollToPage(nextIndex);
      };

      const interval = setInterval(autoScroll, 7000);
      return () => clearInterval(interval);
    }
  }, [numberOfPages, currentIndex]);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const diffX = startX - e.touches[0].clientX;
    if (diffX > 50) {
      setIsDragging(false);
      scrollToPage((currentIndex + 1) % numberOfPages);
    } else if (diffX < -50) {
      setIsDragging(false);
      scrollToPage((currentIndex - 1 + numberOfPages) % numberOfPages);
    }
  };

  const parseFeature = (text) => {
    const parts = text.split(/(<strong>|<\/strong>|<br\s*\/?>)/g);
    return parts.map((part, index) => {
      if (part === "<strong>" || part === "</strong>") return null;
      if (part === "<br/>" || part === "<br />") return <br key={index} />;
      return parts[index - 1] === "<strong>" ? <strong key={index}>{part}</strong> : part;
    });
  };

  const handleTouchEnd = () => setIsDragging(false);

  return (
    <section id="section2" className="SectionTwo-why-choose-us">
      <h2 className="SectionTwo-title">PLANES DE SUSCRIPCIÓN</h2>

      <div
        className="SectionTwo-card-container"
        ref={cardContainerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {subscriptions.map((subscription) => (
          <div key={subscription.id} className={`SectionTwo-card ${subscription.class}`}>
            <div className="SectionTwo-card-icon">
              <FontAwesomeIcon icon={faDumbbell} />
            </div>
            <div className="SectionTwo-card-content">
  <div>
    <h3 className="SectionTwo-card-title">{subscription.title}</h3>
    <p className="SectionTwo-card-text">{subscription.price}</p>
  </div>
  
  <div>
    <ul className="SectionTwo-card-features">
      {subscription.features.map((feature, index) => (
        <li key={index}>
          {parseFeature(feature)}
        </li>
      ))}
    </ul>
    <div className="SectionTwo-card-date">{subscription.date}</div>
  </div>

  <a href="#" className="SectionTwo-card-button" onClick={() => onMoreInfo(subscription.id)}>
    Saber más <FontAwesomeIcon icon={faArrowDown} />
  </a>
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
