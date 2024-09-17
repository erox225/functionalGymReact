import React from 'react';
import WeeklyCalendar from '../components/WeeklyCalendar'; // Importamos el componente del calendario

const Calendar = () => {
  return (
    <div>
        <h1
          style={{ 
            textAlign: 'center', 
            fontSize: '2.0rem',  // Cambiado a camelCase y entre comillas
            marginBottom: '0.5rem', 
            marginTop: '0.5rem' 
          }}
      
      >Calendario</h1>
      <WeeklyCalendar /> {/* Usamos el componente WeeklyCalendar */}
    </div>
  );
};

export default Calendar;
