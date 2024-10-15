import React, { useState } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import './css/SectionFour.css'; 

// Datos de actividades por fecha
const activitiesByDate = {
  "2024-10-16": [
    { name: 'Gimnasio', time: '09:00', aforoMax: 30, aforoActual: 15, intensidad: 'Alta', duracion: "60'", tipo: 'Fuerza - Intensidad' },
    { name: 'Reunión de equipo', time: '11:00', aforoMax: 10, aforoActual: 5, intensidad: 'Media', duracion: "45'", tipo: 'Mente - Cuerpo' },
  ],
  "2024-10-17": [
    { name: 'Yoga', time: '08:00', aforoMax: 20, aforoActual: 12, intensidad: 'Baja', duracion: "60'", tipo: 'Mente - Cuerpo' },
    { name: 'Clase de inglés', time: '10:00', aforoMax: 25, aforoActual: 20, intensidad: 'Media', duracion: "50'", tipo: 'Mente - Cuerpo' },
    { name: 'Meditación', time: '12:00', aforoMax: 15, aforoActual: 10, intensidad: 'Baja', duracion: "30'", tipo: 'Relajación' },
  ],
  "2024-10-18": [
    { name: 'Kickboxing', time: '07:00', aforoMax: 20, aforoActual: 20, intensidad: 'Alta', duracion: "60'", tipo: 'Cardio' },
    { name: 'Baile', time: '09:00', aforoMax: 25, aforoActual: 15, intensidad: 'Media', duracion: "50'", tipo: 'Fuerza - Intensidad' },
    { name: 'Pilates', time: '11:00', aforoMax: 15, aforoActual: 12, intensidad: 'Baja', duracion: "60'", tipo: 'Mente - Cuerpo' },
  ],
  "2024-10-19": [
    { name: 'Spinning', time: '07:00', aforoMax: 20, aforoActual: 18, intensidad: 'Alta', duracion: "50'", tipo: 'Cardio' },
    { name: 'Estiramiento', time: '09:00', aforoMax: 20, aforoActual: 10, intensidad: 'Baja', duracion: "40'", tipo: 'Relajación' },
    { name: 'Zumba', time: '11:00', aforoMax: 25, aforoActual: 25, intensidad: 'Alta', duracion: "60'", tipo: 'Fuerza - Intensidad' },
  ],
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

  // Función para determinar la clase de color basada en el tipo de actividad
  const getTipoClass = (tipo) => {
    switch (tipo) {
      case 'Fuerza - Intensidad':
        return 'tipo-fuerza';
      case 'Mente - Cuerpo':
        return 'tipo-mente';
      case 'Relajación':
        return 'tipo-relajacion';
      case 'Cardio':
        return 'tipo-cardio';
      default:
        return '';
    }
  };

  return (
    <section className="sectionFour">
      <h2 className="sectionFour-title">CALENDARIO</h2>
      <h5 className="sectionFour-sub-title">Selecciona algún día para ver las clases</h5>
      <div className="sectionFour-week-header">
        {weekDays.map((day) => (
          <button
            key={day}
            className={`sectionFour-week-day ${day === selectedDate ? 'active' : ''}`}
            onClick={() => handleDayClick(day)}
          >
            {new Date(day).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' }).replace('.', '')}
          </button>
        ))}
      </div>

      <div className="sectionFour-class-schedule">
        <h2 className="sectionFour-schedule-title">{new Date(selectedDate).toLocaleDateString('es-ES', { weekday: 'long' })}</h2>
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <div key={index} className={`sectionFour-class-item ${getTipoClass(activity.tipo)}`}>
              <div className="sectionFour-class-duration">
              <FontAwesomeIcon icon={faClock} />  {activity.duracion}  
              </div>
              <div className='sectionFour-right-class-data'>
                <span className="sectionFour-class-name">{activity.name}</span>
                <div className="sectionFour-class-time">{activity.time}</div>
              </div>
            </div>
          ))
        ) : (
          <p className='sectionFour-sin-actividades'>No hay actividades programadas para hoy.</p>
        )}
      </div>
    </section>
  );
};

export default SectionFour;
