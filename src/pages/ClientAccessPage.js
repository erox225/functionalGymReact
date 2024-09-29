import React from 'react';
import ClientAccess from '../components/ClientAccess'; // Importa el componente ClientAccess
import { useNavigate } from 'react-router-dom';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'; // Ícono para control de acceso
import HeaderIcons from '../components/HeaderIcons'; // Importamos el componente HeaderIcons
import './css/ControlAcceso.css';

const ClientAccessPage = () => {
  const navigate = useNavigate();

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
      {/* Usamos el componente HeaderIcons y le pasamos los props sin onAddClick */}
      <HeaderIcons 
        icon={faClipboardList} 
        title="Accesos"
      />

      {/* Renderiza el componente ClientAccess con los datos de los clientes */}
      <ClientAccess clients={clients} />
    </div>
  );
};

export default ClientAccessPage;
