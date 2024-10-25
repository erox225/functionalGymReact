import React, { useEffect, useState } from 'react';
import Section from '../components/Section';
import SectionTwo from '../components/SectionTwo';
import SectionThree from '../components/SectionThree';
import SectionFour from '../components/SectionFour';
import SectionFive from '../components/SectionFive';
import SectionFooter from '../components/SectionFooter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { fetchSubscriptions, fetchActivities } from '../bussinesLogic/api';  // Importa las funciones de fetch

const HomePage = () => {
  const [subscriptions, setSubscriptions] = useState([]);  // Inicializa con un array vacío
  const [activitiesByDate, setActivitiesByDate] = useState({});  // Inicializa con un objeto vacío

  useEffect(() => {
    // Función para obtener los datos de la API o mock
    const fetchData = async () => {
      const subs = await fetchSubscriptions();  // Llama a la función para obtener las suscripciones
      setSubscriptions(subs || []);  // Asegura que no sea undefined y asigna un array vacío si es necesario

      const activities = await fetchActivities();  // Llama a la función para obtener las actividades
      setActivitiesByDate(activities || {});  // Asegura que no sea undefined y asigna un objeto vacío si es necesario
    };

    fetchData();  // Ejecuta la función al cargar el componente
  }, []);

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
        backgroundColor="#6200ea"
      />

      {/* Segunda sección: Subscriptions */}
      {subscriptions.length > 0 ? (
        <SectionTwo subscriptions={subscriptions} />
      ) : (
        <p>Cargando suscripciones...</p>  // Mensaje de carga si aún no hay datos
      )}

      {/* Tercera sección: Vacía en este caso */}
      <SectionThree />

      {/* Cuarta sección: Activities */}
      <SectionFour activitiesByDate={activitiesByDate} />

      {/* Quinta sección: Subscriptions */}
      <SectionFive subscriptions={subscriptions} />
      
      {/* Footer de la página */}
      <SectionFooter />
    </>
  );
};

export default HomePage;
