import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'; // Ícono para reservas
import ReservationTable from '../components/ReservationTable'; // Componente para la tabla de reservas
import { useNavigate, useLocation } from 'react-router-dom';
import './css/Reservations.css'; // Archivo CSS específico para reservas
import HeaderIcons from '../components/HeaderIcons'; // Importar el nuevo componente

// Función para formatear la fecha en el formato "Sáb 20 de Noviembre"
const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) {
    return 'Fecha inválida';
  }

  return date.toLocaleDateString('es-ES', {
    weekday: 'short',
    day: 'numeric',
    month: 'long'
  }).replace('.', '');
};

const Reservations = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Simulación de datos de reservas
  const reservations = [
    { id: 101, idReserva: 'R001',duracion:'60', clase: 'Gimnasio', cliente: 'S23DJ' , trainer : 'Miguel Labrador', horarioInicio: '10:00', horarioFin: '11:00', diaEjecucion: '2024-11-20', estado: 'INSCRITO' },
    { id: 102, idReserva: 'R002',duracion:'60', clase: 'Yoga', cliente: 'S23DJ' , trainer : 'Jessica Di Maggio', horarioInicio: '09:00', horarioFin: '09:45', diaEjecucion: '2024-11-21', estado: 'REALIZADO' },
    { id: 103, idReserva: 'R003',duracion:'60', clase: 'Pilates', cliente: 'S23DJ' , trainer : 'Miguel Labrador', horarioInicio: '11:00', horarioFin: '11:50', diaEjecucion: '2024-11-22', estado: 'CANCELADO' },
    { id: 104, idReserva: 'R004',duracion:'60', clase: 'Zumba', cliente: 'S23DJ' , trainer : 'Miguel Labrador', horarioInicio: '12:00', horarioFin: '12:30', diaEjecucion: '2024-11-22', estado: 'EN COLA', queuePosition: 3 }
  ];
  

  const formattedReservations = reservations.map(reserva => ({
    ...reserva,
    diaEjecucion: formatDate(reserva.diaEjecucion)
  }));

  const handleAddClick = () => {
    console.log('Agregar botón clicado');
    // Aquí puedes implementar la funcionalidad de agregar nueva reserva
  };

  return (
    <div>
      <HeaderIcons 
        title="Reservas" 
        onAddClick={handleAddClick}
      />
      <ReservationTable reservations={formattedReservations} />
    </div>
  );
};

export default Reservations;
