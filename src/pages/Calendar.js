import React from 'react';
import WeeklyCalendar from '../components/WeeklyCalendar'; // Importamos el componente del calendario
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'; // Importamos los iconos
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './css/Calendar.css';

const Calendar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    navigate(-1); // Navega a la página anterior
  };

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
