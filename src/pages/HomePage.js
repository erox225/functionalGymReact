import React, { useEffect, useState, useRef } from 'react';
import Section from '../components/Section';
import SectionTwo from '../components/SectionTwo';
import SectionThree from '../components/SectionThree';
import SectionFour from '../components/SectionFour';
import SectionFive from '../components/SectionFive';
import SectionFooter from '../components/SectionFooter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { fetchSubscriptions, fetchActivities } from '../bussinesLogic/api';

const HomePage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [activitiesByDate, setActivitiesByDate] = useState({});
  const sectionFiveRef = useRef(null);
  const [selectedSubscription, setSelectedSubscription] = useState(null); // Estado para la suscripción seleccionada

  useEffect(() => {
    const fetchData = async () => {
      const subs = await fetchSubscriptions();
      setSubscriptions(subs || []);
      const activities = await fetchActivities();
      setActivitiesByDate(activities || {});
    };

    fetchData();
  }, []);

  const handleScrollToSectionFive = (subscriptionId = null) => {
    setSelectedSubscription(subscriptionId); // Establece la suscripción seleccionada
    const targetPosition = sectionFiveRef.current?.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const duration = 1500;

    const smoothScroll = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);

      if (timeElapsed < duration) requestAnimationFrame(smoothScroll);
    };

    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(smoothScroll);
  };

  return (
    <>
      <Section
        id="section1"
        leftContent={
          <>
            <div>
              <h1 className='h1-section1'>Transforma tu cuerpo</h1>
              <h1 className='h1-section1'>
                Transforma tu 
                <span className='h1-section1-vida'>vida</span>
              </h1>
              <h2 className='h2-section1'>MAS RÁPIDA, MAS FUERTE, TU MEJOR VERSIÓN</h2>
              <button className="subscribe-button" onClick={() => handleScrollToSectionFive()}>
                <FontAwesomeIcon icon={faUserPlus} /> INSCRÍBETE
              </button>
            </div>
          </>
        }
        rightContent={
          <>
            <button className="subscribe-button-mini" onClick={() => handleScrollToSectionFive()}>
              <span className="button-icon">
                <FontAwesomeIcon icon={faUserPlus} />
              </span>
              <span className="button-text">INSCRÍBETE</span>
            </button>
          </>
        }
        backgroundColor="#6200ea"
      />

      <SectionTwo subscriptions={subscriptions} onMoreInfo={handleScrollToSectionFive} /> {/* Pasa la función onMoreInfo */}
      <SectionThree />
      <SectionFour activitiesByDate={activitiesByDate} />
      <SectionFive subscriptions={subscriptions} scrollRef={sectionFiveRef} selectedSubscription={selectedSubscription} />
      <SectionFooter />
    </>
  );
};

export default HomePage;
