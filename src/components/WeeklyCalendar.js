// WeeklySchedule.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import './css/WeeklyCalendar.css';
import ActivityTrainer from './ActivityTrainer';
import ActivityClient from './ActivityClient';
import { useAuth } from '../authContext/AuthContext';

const dayAbbreviations = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

const getMonday = (date) => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
};

const WeeklySchedule = () => {
  const { userRole } = useAuth(); // Obtener userRole desde el contexto de autenticación
  const todayFormatted = new Date().toISOString().split('T')[0];
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(todayFormatted);
  const [weekDates, setWeekDates] = useState(Array(7).fill(null));
  const [monthRange, setMonthRange] = useState('');
  const [weekRange, setWeekRange] = useState('');
  const [currentDate, setCurrentDate] = useState(() => getMonday(new Date()));
  const [loadingActivityId, setLoadingActivityId] = useState(null);
  const [reservedActivities, setReservedActivities] = useState([]);

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

  const reserveActivity = async (activityId) => {
    setLoadingActivityId(activityId);
    try {
      const response = await fetch('https://api.example.com/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activityId }),
      });
      if (response.ok) setReservedActivities((prev) => [...prev, activityId]);
      else console.error('Error reservando la actividad');
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
    setLoadingActivityId(null);
  };

  const activitiesByDate = {
    "2024-10-25": [
      { id: 1, name: 'BodyCombat', time: '09:00', aforoMax: 30, aforoActual: 15, intensidad: 'Alta', duracion: "60'", color: 'rgb(176, 6, 6)', intensityColor: 'rgb(176, 6, 6)', trainer: 'Jessica Di Maggio', estado: 'Inscrito' },
      { id: 2, name: 'Pilates', time: '11:00', aforoMax: 10, aforoActual: 5, intensidad: 'Media', duracion: "45'", color: 'rgb(4, 157, 176)', intensityColor: 'rgb(247, 193, 28)', trainer: 'Alex Rivera', estado: 'En cola' },
      { id: 3, name: 'Pesas', time: '11:00', aforoMax: 10, aforoActual: 5, intensidad: 'Media', duracion: "45'", color: 'rgb(4, 157, 176)', intensityColor: 'rgb(247, 193, 28)', trainer: 'Alex Rivera', estado: 'Libre' },
    ],
  };

  return (
    <div className="weekly-schedule">
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

      <ul className="days-list">
        {weekDates.map((date, index) => (
          date && date.dateObj ? (
            <li key={index} onClick={() => handleDayClick(index)} className={selectedDay === date.formattedDate ? 'active' : ''}>
              <div className="day-number">{date.day.toString().padStart(2, '0')}</div>
              <div className="day-abbreviation">{dayAbbreviations[date.dateObj.getDay()]}</div>
            </li>
          ) : null
        ))}
      </ul>

      {selectedDay && activitiesByDate[selectedDay] ? (
        <div className="activities-list">
          {activitiesByDate[selectedDay].map((activity) =>
            userRole === 1 ? (
              <ActivityTrainer
                key={activity.id}
                activity={activity}
                navigate={navigate}
              />
            ) : (
              <ActivityClient
                key={activity.id}
                activity={activity}
                reservedActivities={reservedActivities}
                reserveActivity={reserveActivity}
                loadingActivityId={loadingActivityId}
              />
            )
          )}
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
