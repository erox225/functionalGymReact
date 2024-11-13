import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faDownload } from '@fortawesome/free-solid-svg-icons';
import './css/SectionFour.css'; 
import ClassModal from './ClassModal';

function getCurrentDateFormatted() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const SectionFour = ({ activitiesByDate }) => {
  const [selectedDate, setSelectedDate] = useState(getCurrentDateFormatted());
  const [selectedClass, setSelectedClass] = useState(null);

  const activities = activitiesByDate[selectedDate] || [];

  const handleDayClick = (day) => {
    setSelectedDate(day);
  };

  const getWeekDays = () => {
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(firstDayOfWeek);
      date.setDate(firstDayOfWeek.getDate() + i);
      return date.toISOString().split('T')[0];
    });
  };

  const weekDays = getWeekDays();

  const getTipoClass = (tipo) => {
    switch (tipo) {
      case 'Fuerza - Intensidad': return 'tipo-fuerza';
      case 'Mente - Cuerpo': return 'tipo-mente';
      case 'Relajación': return 'tipo-relajacion';
      case 'Cardio': return 'tipo-cardio';
      default: return '';
    }
  };

  const handleClassClick = (activity) => {
    const colorClass = getTipoClass(activity.tipo);
    setSelectedClass({ ...activity, colorClass });
  };

  const closeModal = () => {
    setSelectedClass(null);
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
        <h6 className="sectionFour-schedule-subtitle">Haz click sobre una clase para ver el detalle</h6>
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <div
              key={index}
              className={`sectionFour-class-item ${getTipoClass(activity.tipo)}`}
              onClick={() => handleClassClick(activity)}
            >
              <div className="sectionFour-class-duration">
                {activity.duracion} <FontAwesomeIcon icon={faClock} /> 
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

      {/* Botón de descarga de imagen del calendario */}
      <div className="sectionFour-download">
        <a href="/calendar-image.png" download="Calendario.png" className="sectionFour-download-button">
          <FontAwesomeIcon icon={faDownload} className='icon-calendar-download'/> Descargar Calendario
        </a>
      </div>

      {selectedClass && <ClassModal classInfo={selectedClass} onClose={closeModal} />}
    </section>
  );
};

export default SectionFour;
