import React from 'react';
import ClientAccess from '../components/ClientAccess'; // Importa el componente ClientAccess
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { faArrowLeft, faClipboardList } from '@fortawesome/free-solid-svg-icons'; // Ícono para reservas

import './css/ControlAcceso.css';
const ClientAccessPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  // Simulación de clientes
  const clients = [
    { id: 1, nombreEstancia: 'Gimnasio', fecha: '2024-09-20', resultado: 'Aprobado', reserva: 101 },
    { id: 2, nombreEstancia: 'Piscina', fecha: '2024-09-22', resultado: 'Denegado', reserva: 102 },
    { id: 3, nombreEstancia: 'Sauna', fecha: '2024-09-25', resultado: 'Aprobado', reserva: 103 },
  ];

  const goBack = () => {
    navigate(-1); // Navega a la página anterior
  };

  return (
    <div>
      <h1 className="class-header">
      <FontAwesomeIcon icon={faClipboardList} className="header-icon" />
      Control de Acceso</h1>
      <ClientAccess clients={clients} />
    </div>
  );
};

export default ClientAccessPage;


