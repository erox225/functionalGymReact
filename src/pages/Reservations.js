import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'; // Ícono para reservas
import ReservationTable from '../components/ReservationTable'; // Componente que se creará para la tabla de reservas
import './css/Reservations.css'; // Archivo CSS específico para reservas

const Reservations = () => {
  // Simulación de datos de reservas
  const reservations = [
    { 
      id: 101, 
      clase: 'Gimnasio', 
      cliente: 'Juan Pérez', 
      horarioInicio: '2024-09-20 09:00', 
      horarioFin: '2024-09-20 10:00' 
    },
    { 
      id: 102, 
      clase: 'Yoga', 
      cliente: 'María Gómez', 
      horarioInicio: '2024-09-21 08:00', 
      horarioFin: '2024-09-21 09:00' 
    },
    { 
      id: 103, 
      clase: 'Pilates', 
      cliente: 'Ana Martínez', 
      horarioInicio: '2024-09-22 10:00', 
      horarioFin: '2024-09-22 11:00' 
    },
  ];

  return (
    <div>
      {/* Título con ícono */}
      <h1 className="reservation-header">
        <FontAwesomeIcon icon={faClipboardList} className="header-icon" />
        Reservas
      </h1>

      {/* Renderiza el componente de la tabla con los datos de reservas */}
      <ReservationTable reservations={reservations} />
    </div>
  );
};

export default Reservations;
