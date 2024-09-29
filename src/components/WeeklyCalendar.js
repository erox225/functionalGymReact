import React, { useState, useEffect } from 'react';
import './css/WeeklyCalendar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faAngleLeft, faAngleRight, faEdit, faEye, faArrowRight, faArrowLeft, faBolt, faClock, faUsers, faClipboardList } from '@fortawesome/free-solid-svg-icons';

// Diccionario para mapear los días completos a las abreviaturas
const dayAbbreviations = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

// Función para obtener el primer día de la semana (lunes)
const getMonday = (date) => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Ajuste si el día es domingo
  return new Date(date.setDate(diff));
};

const WeeklySchedule = () => {
  const todayFormatted = new Date().toISOString().split('T')[0];

  const [selectedDay, setSelectedDay] = useState(todayFormatted);
  const [weekDates, setWeekDates] = useState(Array(7).fill(null));
  const [monthRange, setMonthRange] = useState('');
  const [weekRange, setWeekRange] = useState('');
  const [currentDate, setCurrentDate] = useState(() => getMonday(new Date()));

  useEffect(() => {
    const updateWeekDates = (startDate) => {
      const dates = [];
      const firstDate = new Date(startDate);
      const lastDate = new Date(startDate);
      lastDate.setDate(firstDate.getDate() + 6);

      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(firstDate.getDate() + i);
        dates.push({
          dateObj: date,
          formattedDate: date.toISOString().split('T')[0],
          day: date.getDate(),
          month: date.toLocaleString('es-ES', { month: 'long' }),
        });
      }

      setWeekDates(dates);

      const weekRange = `${firstDate.getDate().toString().padStart(2, '0')} - ${lastDate.getDate().toString().padStart(2, '0')}`;
      setWeekRange(weekRange);

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

  const nextWeek = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(nextDate);
  };

  const prevWeek = () => {
    const prevDate = new Date(currentDate);
    prevDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(prevDate);
  };

  // Actividades con intensidad y duración añadidas
  const activitiesByDate = {
    "2024-09-18": [
      { name: 'Gimnasio', time: '09:00 - 10:00', aforoMax: 30, aforoActual: 15, intensidad: 'Alta', duracion: "60'" },
      { name: 'Reunión de equipo', time: '11:00 - 12:00', aforoMax: 10, aforoActual: 5, intensidad: 'Media', duracion: "45'" },
    ],
    "2024-09-19": [
      { name: 'Yoga', time: '08:00 - 09:00', aforoMax: 20, aforoActual: 12, intensidad: 'Baja', duracion: "60'" },
      { name: 'Clase de inglés', time: '10:00 - 11:00', aforoMax: 25, aforoActual: 20, intensidad: 'Media', duracion: "50'" },
    ],
  };

  return (
    <div className="weekly-schedule">
      {/* Mostrar el mes y el rango de la semana con las flechas */}
      <div className="calendar-header">
        <button className="arrow-button" onClick={prevWeek}>
          <FontAwesomeIcon icon={faAngleLeft} className="header-icon" />
          </button>
        <div className="week-info">
          <h2>{monthRange}</h2>
          <p>Semana: {weekRange}</p>
        </div>
        <button className="arrow-button" onClick={nextWeek}>
          <FontAwesomeIcon icon={faAngleRight} className="header-icon" />
          </button>
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

                <div className="activity-aforo">
                  <FontAwesomeIcon icon={faUsers} style={{ marginRight: '0.3rem' }} />
                  Aforo: {activity.aforoMax}/{activity.aforoActual}
                </div>
                {/* Añadimos intensidad y duración con íconos */}
                <div className="activity-intensity">
                  <FontAwesomeIcon icon={faBolt} style={{ marginRight: '0.3rem' }} />
                  Intensidad: {activity.intensidad}
                </div>
                <div className="activity-duration">
                  <FontAwesomeIcon icon={faClock} style={{ marginRight: '0.3rem' }} />
                  Duración: {activity.duracion}
                </div>
              </div>

              {/* Botones de edición y visualización */}
              <div className="right-activity">
                <div className="activity-time">
                  {activity.time}
                </div>
                <div className="activity-buttons">
                  <Link to={`/edit/${activity.name}`} className="edit-button">
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                  <Link to={`/view/${activity.name}`} className="view-button">
                    <FontAwesomeIcon icon={faEye} />
                  </Link>
                  <Link to={`/view/${activity.name}`} className="reserve-button">
                    <FontAwesomeIcon icon={faClipboardList} /> 
                    <span className='boton-reservar'>Reservar</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-activity">
          <p>No hay actividades para la fecha seleccionada.</p>
        </div>
      )}
    </div>
  );
};

export default WeeklySchedule;

<FontAwesomeIcon icon="fa-solid faCircleChevronLeft" />
