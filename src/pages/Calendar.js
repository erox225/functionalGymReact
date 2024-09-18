import React from 'react';
import WeeklyCalendar from '../components/WeeklyCalendar'; // Importamos el componente del calendario
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'; // Importamos los iconos
import './css/Calendar.css';

const Calendar = () => {
  return (
    <div>
        <h1 className="class-header">
        <FontAwesomeIcon icon={faCalendarAlt} className="header-icon" />
        Calendario
      </h1>
      <WeeklyCalendar /> {/* Usamos el componente WeeklyCalendar */}
    </div>
  );
};

export default Calendar;
