import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faLock, faCogs, faBarcode } from '@fortawesome/free-solid-svg-icons';
import QrModal from './QrModal';
import ClassModal from './ClassModal';
import './css/GridDashboard.css';
import { useAuth } from '../authContext/AuthContext';

const GridDashboard = () => {
  const { userRole } = useAuth();
  const today = new Date();
  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const monthsOfYear = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  const day = daysOfWeek[today.getDay()];
  const month = monthsOfYear[today.getMonth()];
  const dayNumber = today.getDate();

  const [modalVisible, setModalVisible] = useState(false);
  const [qrData, setQrData] = useState(null);

  const [classModalVisible, setClassModalVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const classesToday = [
    {
      name: 'Yoga',
      time: '10:00',
      aforoMax: 30,
      aforoActual: 30,
      intensidad: 'Media',
      duracion: "60´",
      tipo: 'Mente - Cuerpo',
      colorClass: 'tipo-mente',
      imagen: 'Balance',
      descripcion: 'Clase de relajación y estiramiento.',
      estado: 'Inscrito'
    },
    {
      name: 'Spinning',
      time: '12:00',
      aforoMax: 25,
      aforoActual: 20,
      intensidad: 'Alta',
      duracion: "45´",
      tipo: 'Cardio',
      colorClass: 'tipo-cardio',
      imagen: 'TrainNow',
      descripcion: 'Sesión intensa de spinning.',
      estado: 'Inscrito'
    },
    {
      name: 'Zumba',
      time: '15:00',
      aforoMax: 40,
      aforoActual: 40,
      intensidad: 'Alta',
      duracion: "50´",
      tipo: 'Cardio',
      colorClass: 'tipo-cardio',
      imagen: 'BodyPom',
      descripcion: 'Ejercicio aeróbico con ritmos latinos.',
      estado: 'En cola'
    },
    {
      name: 'Pilates',
      time: '17:00',
      aforoMax: 20,
      aforoActual: 18,
      intensidad: 'Baja',
      duracion: "55´",
      tipo: 'Mente - Cuerpo',
      colorClass: 'tipo-mente',
      imagen: 'Cross',
      descripcion: 'Pilates para fortalecer el core.',
      estado: 'Inscrito'
    },
    {
      name: 'Boxeo',
      time: '19:00',
      aforoMax: 15,
      aforoActual: 15,
      intensidad: 'Alta',
      duracion: "60´",
      tipo: 'Fuerza',
      colorClass: 'tipo-fuerza',
      imagen: 'BodyCom',
      descripcion: 'Entrenamiento de boxeo y fuerza.',
      estado: 'Libre'
    }
  ];
  

  const reservations = [
    { date: '2024-10-22', name: 'Pilates', inicio: '9:30 AM' },
    { date: '2024-10-22', name: 'Reserva 2', inicio: '11:00 AM' },
    { date: '2024-10-23', name: 'Reserva 3', inicio: '2:30 PM' },
    { date: '2024-10-24', name: 'Reserva 4', inicio: '4:00 PM' }
  ];

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

  const reservationColors = ['rgb(4, 157, 176)', 'rgb(176, 6, 6)', 'rgb(36, 196, 143)', 'rgb(247, 193, 28)', 'rgb(248, 199, 6)'];

  const handleQrClick = (reservation) => {
    const qrJson = JSON.stringify({
      name: reservation.name,
      date: reservation.date,
      inicio: reservation.inicio
    });

    setQrData(qrJson);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleClassClick = (classItem) => {
    setSelectedClass(classItem);
    setClassModalVisible(true);
  };

  const handleCloseClassModal = () => {
    setClassModalVisible(false);
  };

  return (
    <div className="grid-container">
      <div className="grid-item-rectangular">
        <div className="grid-item-header">
          <span className="grid-item-days">
            <span className='grid-item-days-day'>{day}</span>
            <span className='grid-item-days-month'>{month}</span>
          </span>
          <span className="grid-item-day-number">{dayNumber}</span>
        </div>
        <ul className="grid-item-class-list">
          {classesToday.map((classItem, index) => (
            <li 
              key={index} 
              className="grid-item-class"
              onClick={() => handleClassClick(classItem)}
            >
              <div
                className='grid-item-bar-color'
                style={{ 
                  border: `1px solid ${classStyles[index % classStyles.length].borderColor}`, 
                  backgroundColor: classStyles[index % classStyles.length].backgroundColor 
                }}
              ></div>
              <div className='grid-item-text-container'>
                <span className='grid-item-itenName'>{classItem.name}</span>
                <span className='grid-item-iten-time'>{classItem.time}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {userRole === 1 ? (
        <Link to="/clients" className="grid-item">
          <FontAwesomeIcon icon={faUserFriends} className="grid-icon" />
          <span>Clientes</span>
        </Link>
      ) : (
        <Link className="grid-item">
          <FontAwesomeIcon icon={faUserFriends} className="grid-icon" />
          <span>Genérico</span>
        </Link>
      )}

      <Link to="/accessControl" className="grid-item">
        <FontAwesomeIcon icon={faLock} className="grid-icon" />
        <span>Control de acceso</span>
      </Link>
      <Link to="/configurations" className="grid-item">
        <FontAwesomeIcon icon={faCogs} className="grid-icon" />
        <span>Configuraciones</span>
      </Link>

      <div className="grid-item-reservations">
        <h2 className="grid-item-reservations-title">
          {userRole === 1 ? "Todas las reservas" : "Mis Reservas"}
        </h2>
        <div className="grid-item-reservation-list">
          {reservations.length > 0 ? (
            reservations.map((reservation, index) => (
              <div 
                key={index} 
                className="grid-item-reservation"
              >
                <div className='grid-item-reservation-details' style={{ backgroundColor: reservationColors[index % reservationColors.length] }}>
                  <span className='grid-item-reservation-name'>{reservation.name}</span>
                  <span className='grid-item-reservation-date'>{formatDate(reservation.date)}</span>
                  <span className='grid-item-reservation-inicio'>{reservation.inicio}</span>
                </div>   
                <button 
                  className="vertical-button"
                  onClick={() => handleQrClick(reservation)}
                >
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
        <Link to="/reservations" className="grid-item-reservations-link">
          {userRole === 1 ? "Ir a todas las reservas" : "Ir a mis reservas"}
        </Link>
      </div>

      {modalVisible && (
        <QrModal qrData={qrData} onClose={handleCloseModal} />
      )}

      {classModalVisible && (
        <ClassModal classInfo={selectedClass} onClose={handleCloseClassModal} />
      )}
    </div>
  );
};

export default GridDashboard;
