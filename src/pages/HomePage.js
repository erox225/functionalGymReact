import React from 'react';
import Section from '../components/Section';
import SectionTwo from '../components/SectionTwo'; // Asegúrate de importar SectionTwo
import SectionThree from '../components/SectionThree'; // Asegúrate de importar SectionTwo
import SectionFour from '../components/SectionFour'; // Importamos SectionFour
import SectionFive from '../components/SectionFive'; // Importamos SectionFour
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'; // Icono para el botón


const subscriptions = [
  {
    id: 1,
    title: "Plan Premium",
    price: "50€ + Matrícula 30€",
    features: [
      "Acceso a todas las clases (podrás reservar una clase y al finalizar tendrás acceso a otra reserva del mismo día)",
      "Plan de alimentación básico que se actualizará cada 3 meses",
      "+Más taller de postura"
    ],
    date: "30.11.2022",
    class: "SectionTwo-card-premium"
  },
  {
    id: 2,
    title: "Plan Matutino",
    price: "40€ + Matrícula 30€",
    features: [
      "Acceso a todas las clases en la mañana (podrás reservar una clase y al finalizar tendrás acceso a otra reserva matutina del mismo día)",
      "Plan de alimentación básico que se actualizará cada 3 meses",
      "Más taller de postura"
    ],
    date: "30.11.2022",
    class: "SectionTwo-card-matutino"
  },
  {
    id: 3,
    title: "Plan 3 Sesiones a la Semana",
    price: "34.90€ + Matrícula 30€",
    features: ["Acceso a cualquier hora 3 sesiones a la semana"],
    date: "30.11.2022",
    class: "SectionTwo-card-3sesiones"
  },
  {
    id: 4,
    title: "Plan Estudiantil",
    price: "34.90€ Matrícula gratis",
    features: [
      "No podrás acceder a la franja horaria marcada en color gris",
      "Acceso a taller de postura"
    ],
    date: "30.11.2022",
    class: "SectionTwo-card-estudiantil"
  },
  {
    id: 5,
    title: "Plan Corporativo (2 personas)",
    price: "34.90€ + Matrícula 15€",
    features: ["No podrás acceder a la franja horaria marcada en color gris"],
    date: "30.11.2022",
    class: "SectionTwo-card-corporativo"
  },
  {
    id: 6,
    title: "Plan Familiar",
    price: "Paga 50% de matrícula y escoge tu plan",
    features: [],
    date: "30.11.2022",
    class: "SectionTwo-card-familiar"
  }
];



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
      <SectionTwo subscriptions={subscriptions}/>

      <SectionThree />

      <SectionFour />

      <SectionFive subscriptions={subscriptions} />
    </>
  );
};

export default HomePage;
