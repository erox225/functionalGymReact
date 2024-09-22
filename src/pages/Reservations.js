import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'; // Ícono para reservas
import ReservationTable from '../components/ReservationTable'; // Componente para la tabla de reservas
import './css/Reservations.css'; // Archivo CSS específico para reservas

// Función para formatear la fecha en el formato "Sáb 20 de Noviembre"
const formatDate = (dateString) => {
  const date = new Date(dateString); // El formato debe ser 'yyyy-mm-dd' para que JavaScript lo entienda
  
  if (isNaN(date)) {
    return 'Fecha inválida'; // Manejar casos donde la fecha no se pueda convertir correctamente
  }

  return date.toLocaleDateString('es-ES', {
    weekday: 'short', // Día de la semana (abreviado)
    day: 'numeric',   // Día del mes
    month: 'long'     // Mes completo
  }).replace('.', ''); // Eliminar posibles puntos en los días abreviados
};

const Reservations = () => {
  // Simulación de datos de reservas (cambiando el formato de fecha a 'yyyy-mm-dd')
  const reservations = [
    { 
      id: 101, 
      clase: 'Gimnasio', 
      cliente: 'S23DJ', 
      horarioInicio: '09:00', 
      horarioFin: '10:00', 
      diaEjecucion: '2024-11-20' // Formato 'yyyy-mm-dd'
    },
    { 
      id: 102, 
      clase: 'Yoga', 
      cliente: 'S23DJ', 
      horarioInicio: '08:00', 
      horarioFin: '09:00', 
      diaEjecucion: '2024-11-21' // Formato 'yyyy-mm-dd'
    },
    { 
      id: 103, 
      clase: 'Pilates', 
      cliente: 'S23DJ', 
      horarioInicio: '10:00', 
      horarioFin: '11:00', 
      diaEjecucion: '2024-11-22' // Formato 'yyyy-mm-dd'
    },
  ];

  // Formatear las fechas antes de pasar los datos a la tabla
  const formattedReservations = reservations.map(reserva => ({
    ...reserva,
    diaEjecucion: formatDate(reserva.diaEjecucion)
  }));

  return (
    <div>
      {/* Título con ícono */}
      <h1 className="reservation-header">
        <FontAwesomeIcon icon={faClipboardList} className="header-icon" />
        Reservas
      </h1>

      {/* Renderiza el componente de la tabla con los datos de reservas formateados */}
      <ReservationTable reservations={formattedReservations} />
    </div>
  );
};

export default Reservations;
