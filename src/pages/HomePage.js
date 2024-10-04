import React from 'react';
import Section from '../components/Section';
import SectionTwo from '../components/SectionTwo'; // Asegúrate de importar SectionTwo
import SectionThree from '../components/SectionThree'; // Asegúrate de importar SectionTwo
import SectionFour from '../components/SectionFour'; // Importamos SectionFour
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'; // Icono para el botón

const HomePage = () => {
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
              <button className="subscribe-button">
                <FontAwesomeIcon icon={faUserPlus} /> INSCRÍBETE
              </button>
            </div>
          </>
        }
        rightContent={
          <>
            <button className="subscribe-button-mini">
              <span className="button-icon">
                <FontAwesomeIcon icon={faUserPlus} />
              </span>
              <span className="button-text">INSCRÍBETE</span>
            </button>
          </>
        }
        backgroundColor="#6200ea" // Este color de fondo se puede ignorar o usar como fallback
      />
      
      {/* Aquí llamamos a SectionTwo */}
      <SectionTwo />

      <SectionThree />

      <SectionFour />

      <Section
        id="section4"
        title="Sección 4"
        content="Has llegado a la última sección."
        backgroundColor="#f44336"
      />
    </>
  );
};

export default HomePage;
