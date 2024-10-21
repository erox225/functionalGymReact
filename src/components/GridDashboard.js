import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faLock, faCogs, faBarcode } from '@fortawesome/free-solid-svg-icons';
import './css/GridDashboard.css';

const GridDashboard = () => {
  const today = new Date();
  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const monthsOfYear = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  const day = daysOfWeek[today.getDay()];
  const month = monthsOfYear[today.getMonth()];
  const dayNumber = today.getDate();

  // Formato de las clases como un array de objetos
  const classesToday = [
    { name: 'Yoga', time: '10:00 AM' },
    { name: 'Spinning', time: '12:00 PM' },
    { name: 'Zumba', time: '3:00 PM' },
    { name: 'Pilates', time: '5:00 PM' },
    { name: 'Boxeo', time: '7:00 PM' }
  ];

  // Simulación de reservas ordenadas por fecha y con el atributo "inicio"
  const reservations = [
    { date: '2024-10-22', name: 'Pilates', inicio: '9:30 AM' },
    { date: '2024-10-22', name: 'Reserva 2', inicio: '11:00 AM' },
    { date: '2024-10-23', name: 'Reserva 3', inicio: '2:30 PM' },
    { date: '2024-10-24', name: 'Reserva 4', inicio: '4:00 PM' }
  ];

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('es-ES', { month: 'long' }).toUpperCase();
    return `${day} ${month}`;
  };

  const classStyles = [
    { borderColor: 'rgb(255, 99, 71)', backgroundColor: 'rgba(255, 99, 71, 0.6)' },
    { borderColor: 'rgb(70, 130, 180)', backgroundColor: 'rgba(70, 130, 180, 0.6)' },
    { borderColor: 'rgb(50, 205, 50)', backgroundColor: 'rgba(50, 205, 50, 0.6)' },
    { borderColor: 'rgb(255, 215, 0)', backgroundColor: 'rgba(255, 215, 0, 0.6)' },
    { borderColor: 'rgb(255, 105, 180)', backgroundColor: 'rgba(255, 105, 180, 0.6)' }
  ];

  // Array de colores para las reservas
  const reservationColors = ['rgb(4, 157, 176)', 'rgb(176, 6, 6)', 'rgb(36, 196, 143)', 'rgb(247, 193, 28)', 'rgb(248, 199, 6)']; // Colores diferentes para cada reserva

  return (
    <div className="grid-container">
      {/* Nuevo elemento rectangular para mostrar el día y clases */}
      <div className="grid-item-rectangular">
        <div className="grid-item-header">
          <span className="grid-item-days">
            <span className='grid-item-days-day'>{day}</span>
            <span className='grid-item-days-month'>{month}</span>
          </span>
          <span className="grid-item-day-number">{dayNumber}</span>
        </div>
        {/* Ajuste del formato Nombre, Hora */}
        <ul className="grid-item-class-list">

          {classesToday.map((classItem, index) => (
            <li 
              key={index} 
              className="grid-item-class"
              >

          <div
          className='grid-item-bar-color'
          style={{ 
            border: `1px solid ${classStyles[index % classStyles.length].borderColor}`, 
            backgroundColor: classStyles[index % classStyles.length].backgroundColor 
          }}
          >
            
          </div>
          <div className='grid-item-text-container'>
          <span className='grid-item-itenName'>{classItem.name}</span>
          <span className='grid-item-iten-time'>{classItem.time}</span>
          </div>
              
            </li>
          ))}
        </ul>
      </div>

      <Link to="/clients" className="grid-item">
        <FontAwesomeIcon icon={faUserFriends} className="grid-icon" />
        <span>Clientes</span>
      </Link>
      <Link to="/accessControl" className="grid-item">
        <FontAwesomeIcon icon={faLock} className="grid-icon" />
        <span>Control de acceso</span>
      </Link>
      <Link to="/configurations" className="grid-item">
        <FontAwesomeIcon icon={faCogs} className="grid-icon" />
        <span>Configuraciones</span>
      </Link>

      {/* Nuevo elemento para las reservas */}
      <div className="grid-item-reservations">
        <h2 className="grid-item-reservations-title">Mis Reservas</h2>
        <div className="grid-item-reservation-list">
          {reservations.length > 0 ? (
            reservations.map((reservation, index) => (
              <div 
                key={index} 
                className="grid-item-reservation"
                > {/* Aplicar color dinámicamente */}
                
                <div className='grid-item-reservation-details' style={{ backgroundColor: reservationColors[index % reservationColors.length] }}>
                <span className='grid-item-reservation-name'>{reservation.name}</span>
                <span className='grid-item-reservation-date'>{formatDate(reservation.date)}</span> {/* Convertir la fecha al formato deseado */}
                <span className='grid-item-reservation-inicio'>{reservation.inicio}</span> {/* Mostrar el atributo inicio */}
                </div>   
                <button className="vertical-button">
                  <span className='vertical-button-code-bar'>
                  <FontAwesomeIcon icon={faBarcode}/>
                  <FontAwesomeIcon icon={faBarcode}/>
                  </span>
                  <div className='vertical-button-text'>
                    Ver QR
                  </div>
                </button>

             
              </div>
            ))
          ) : (
            <div className="grid-item-no-reservations">No existen reservas</div>
          )}
        </div>
        <Link to="/reservations" className="grid-item-reservations-link">Ir a mis reservas</Link>
      </div>
    </div>
  );
};

export default GridDashboard;
