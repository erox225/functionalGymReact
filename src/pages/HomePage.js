import React from 'react';
import Section from '../components/Section';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'; // Icono para el botón

const HomePage = () => {
  return (
    <>
      <Section
        id="section1"
        leftContent={
          <>
            <h1 className='h1-section1'>Transforma tu cuerpo</h1>
            <h1 className='h1-section1'>Transforma tu 
              <span className='h1-section1-vida'>
              vida
                </span>
            </h1>
            <h2 className='h2-section1'>MAS RÁPIDA, MAS FUERTE, TU MEJOR VERSIÓN</h2>
            <button className="subscribe-button">
              <FontAwesomeIcon icon={faUserPlus} /> INSCRÍBETE
            </button>
          </>
        }
        backgroundColor="#191817" // Este color de fondo se puede ignorar o usar como fallback
      />
      <Section
        id="section2"
        title="Sección 2"
        content="Esta es la segunda sección."
        backgroundColor="#000000"
      />
      <Section
        id="section3"
        title="Sección 3"
        content="Explora nuestra tercera sección."
        backgroundColor="#ff9800"
      />
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
