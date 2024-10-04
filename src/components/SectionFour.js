import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faHeartbeat, faClock, faBolt } from '@fortawesome/free-solid-svg-icons'; // Íconos
import './css/SectionFour.css'; // Estilos para esta sección

// Datos de actividades por fecha
const activitiesByDate = {
  "2024-10-02": [
    { name: 'Gimnasio', time: '09:00 - 10:00', aforoMax: 30, aforoActual: 15, intensidad: 'Alta', duracion: "60'" },
    { name: 'Reunión de equipo', time: '11:00 - 12:00', aforoMax: 10, aforoActual: 5, intensidad: 'Media', duracion: "45'" },
  ],
  "2024-09-19": [
    { name: 'Yoga', time: '08:00 - 09:00', aforoMax: 20, aforoActual: 12, intensidad: 'Baja', duracion: "60'" },
    { name: 'Clase de inglés', time: '10:00 - 11:00', aforoMax: 25, aforoActual: 20, intensidad: 'Media', duracion: "50'" },
  ],
  // Añade más fechas y actividades según necesites
};

// Obtiene la fecha en formato YYYY-MM-DD
function getCurrentDateFormatted() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const SectionFour = () => {
  const [selectedDate, setSelectedDate] = useState(getCurrentDateFormatted());

  // Obtiene las actividades del día seleccionado
  const activities = activitiesByDate[selectedDate] || [];

  // Cambia el día seleccionado
  const handleDayClick = (day) => {
    setSelectedDate(day);
  };

  // Genera las fechas de la semana actual (lunes a domingo)
  const getWeekDays = () => {
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Lunes
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(firstDayOfWeek);
      date.setDate(firstDayOfWeek.getDate() + i);
      return date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    });
  };

  const weekDays = getWeekDays();

  // Función para determinar la clase de color basada en la intensidad
  const getIntensityClass = (intensidad) => {
    switch (intensidad) {
      case 'Alta':
        return 'intensidad-alta';
      case 'Media':
        return 'intensidad-media';
      case 'Baja':
        return 'intensidad-baja';
      default:
        return '';
    }
  };

  return (
    <section className="section-four">
      <h2 className="section-four-title">CALENDARIO</h2>
      {/* Cabecera con los días de la semana */}
      <div className="week-header">
        {weekDays.map((day) => (
          <button
            key={day}
            className={`week-day ${day === selectedDate ? 'active' : ''}`}
            onClick={() => handleDayClick(day)}
          >
            {new Date(day).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' }).replace('.', '')} {/* Día en formato abreviado */}
          </button>
        ))}
      </div>

      {/* Mostrar las actividades del día seleccionado */}
      <div className="class-schedule">
        <h2 className="schedule-title">{new Date(selectedDate).toLocaleDateString('es-ES', { weekday: 'long' })}</h2>
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <div key={index} className="class-item">

              <div className="class-time"><FontAwesomeIcon icon={faClock} />  {activity.time}</div>
              <div className="class-info">
                <span className="class-name">{activity.name}</span>
                <div className={`class-intensidad ${getIntensityClass(activity.intensidad)}`}>
                  <FontAwesomeIcon icon={faBolt} /> 
                  <span className ="intensidad-value">
                  Intensidad: {activity.intensidad}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className='sin-actividades'>No hay actividades programadas para hoy.</p>
        )}
      </div>
    </section>
  );
};

export default SectionFour;
