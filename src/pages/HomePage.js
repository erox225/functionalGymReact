import React from 'react';
import Section from '../components/Section';

const HomePage = () => {
  return (
    <>
      <Section
        id="section1"
        title="Sección 1"
        content="Bienvenido a la primera sección."
        backgroundColor="#03a9f4"
      />
      <Section
        id="section2"
        title="Sección 2"
        content="Esta es la segunda sección."
        backgroundColor="#4caf50"
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