import React, { useState, useEffect } from 'react';
import './css/WeeklyCalendar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importar FontAwesome
import { faEdit, faEye, faArrowRight ,faArrowLeft   } from '@fortawesome/free-solid-svg-icons'; // Íconos de lápiz y ojo

// Diccionario para mapear los días completos a las abreviaturas
const dayAbbreviations = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

// Función para obtener el primer día de la semana (lunes)
const getMonday = (date) => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Ajuste si el día es domingo
  return new Date(date.setDate(diff));
};

const WeeklySchedule = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [weekDates, setWeekDates] = useState(Array(7).fill(null)); // Inicializa con un array de 7 valores nulos
  const [monthRange, setMonthRange] = useState(''); // Para guardar el mes o los meses actuales
  const [weekRange, setWeekRange] = useState(''); // Para guardar el rango de la semana (Lun a Dom)
  const [currentDate, setCurrentDate] = useState(() => getMonday(new Date())); // Controla la semana actual, empezando desde el lunes

  useEffect(() => {
    const updateWeekDates = (startDate) => {
      const dates = [];
      const firstDate = new Date(startDate);
      const lastDate = new Date(startDate);
      lastDate.setDate(firstDate.getDate() + 6);

      // Obtenemos las fechas de la semana actual
      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(firstDate.getDate() + i);
        dates.push({
          dateObj: date, // Objeto Date para comparaciones
          formattedDate: date.toISOString().split('T')[0], // Fecha en formato 'YYYY-MM-DD'
          day: date.getDate(),
          month: date.toLocaleString('es-ES', { month: 'long' }),
        });
      }

      setWeekDates(dates);

      // Actualizamos el rango de la semana (p.ej., "01 - 07 de Septiembre")
      const weekRange = `${firstDate.getDate().toString().padStart(2, '0')} - ${lastDate.getDate().toString().padStart(2, '0')}`;
      setWeekRange(weekRange);

      // Si el mes cambia durante la semana, mostramos ambos meses
      const firstMonth = firstDate.toLocaleString('es-ES', { month: 'long' });
      const lastMonth = lastDate.toLocaleString('es-ES', { month: 'long' });
      const monthRange = firstMonth === lastMonth ? firstMonth : `${firstMonth} - ${lastMonth}`;
      setMonthRange(monthRange.charAt(0).toUpperCase() + monthRange.slice(1));
    };

    updateWeekDates(currentDate);
  }, [currentDate]);

  const handleDayClick = (index) => {
    setSelectedDay(weekDates[index]?.formattedDate);
  };

  // Avanza a la semana siguiente
  const nextWeek = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(nextDate);
  };

  // Retrocede a la semana anterior
  const prevWeek = () => {
    const prevDate = new Date(currentDate);
    prevDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(prevDate);
  };

  const activitiesByDate = {
    "2024-09-18": [
      { name: 'Gimnasio', time: '09:00 - 10:00', aforoMax: 30, aforoActual: 15 },
      { name: 'Reunión de equipo', time: '11:00 - 12:00', aforoMax: 10, aforoActual: 5 },
    ],
    "2024-09-19": [
      { name: 'Yoga', time: '08:00 - 09:00', aforoMax: 20, aforoActual: 12 },
      { name: 'Clase de inglés', time: '10:00 - 11:00', aforoMax: 25, aforoActual: 20 },
    ],
  };

  return (
    <div className="weekly-schedule">
      {/* Mostrar el mes y el rango de la semana con las flechas */}
      <div className="calendar-header">
        <button className="arrow-button" onClick={prevWeek}><FontAwesomeIcon icon={faArrowLeft} className="header-icon" /></button>
        <div className="week-info">
          <h2>{monthRange}</h2>
          <p>Semana: {weekRange}</p>
        </div>
        <button className="arrow-button" onClick={nextWeek}><FontAwesomeIcon icon={faArrowRight} className="header-icon" /></button>
      </div>

      {/* Lista horizontal de días con el número arriba de la abreviatura */}
      <ul className="days-list">
        {weekDates.map((date, index) => (
          date && date.dateObj ? (
            <li
              key={index}
              onClick={() => handleDayClick(index)}
              className={selectedDay === date.formattedDate ? 'active' : ''}
            >
              <div className="day-number">{date.day.toString().padStart(2, '0')}</div>
              <div className="day-abbreviation">{dayAbbreviations[date.dateObj.getDay()]}</div>
            </li>
          ) : null
        ))}
      </ul>

      {/* Lista vertical de actividades basadas en la fecha seleccionada */}
      {selectedDay && activitiesByDate[selectedDay] ? (
        <div className="activities-list">
          {activitiesByDate[selectedDay].map((activity, index) => (
            <div key={index} className="activity">
              <div className="activity-details">
                <Link to={`/class/${activity.name}`} className="view-class-button">
                  {activity.name}
                </Link>
                <div className="activity-time">{activity.time}</div>
                <div className="activity-aforo">
                  Aforo: {activity.aforoMax}/{activity.aforoActual}
                </div>
              </div>

              {/* Botones de edición y visualización */}
              <div className="activity-buttons">
                <Link to={`/edit/${activity.name}`} className="edit-button">
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
                <Link to={`/view/${activity.name}`} className="view-button">
                  <FontAwesomeIcon icon={faEye} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay actividades para la fecha seleccionada.</p>
      )}
    </div>
  );
};

export default WeeklySchedule;
