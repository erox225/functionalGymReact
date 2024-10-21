import React from 'react';
import WeeklyCalendar from '../components/WeeklyCalendar'; // Importamos el componente del calendario
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'; // Importamos los iconos
import { useNavigate } from 'react-router-dom';
import './css/Calendar.css'; // Importa el archivo CSS
import HeaderIcons from '../components/HeaderIcons'; // Importamos el componente HeaderIcons

const Calendar = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navega a la página anterior
  };

  const handleAddClick = () => {
    console.log('Agregar nueva entrada en el calendario');
    // Aquí puedes agregar la funcionalidad de agregar nueva entrada
  };

  return (
    <div className="calendar-page"> {/* Añadimos la clase CSS para el fondo */}
      {/* Usamos el componente HeaderIcons y le pasamos los props */}
      <HeaderIcons 
        icon={faCalendarAlt} 
        title="Calendario" 
        onAddClick={handleAddClick} 
      />
      
      {/* Usamos el componente WeeklyCalendar */}
      <WeeklyCalendar />
    </div>
  );
};

export default Calendar;
