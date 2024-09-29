import React from 'react';
import ClientTable from '../components/ClientTable'; // Asegúrate de ajustar la ruta según la ubicación de ClientTable
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'; // Ícono para reservas
import { useNavigate, Link, useLocation } from 'react-router-dom';


const Clients = () => {

  const navigate = useNavigate();
  const location = useLocation();

  // Datos de ejemplo para los clientes, ahora con email y suscripción
  const clients = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', email: 'juan.perez@example.com', suscripcion: 'Premium', estado: 'Activo', imagenUrl:`https://via.placeholder.com/100` },
    { id: 2, nombre: 'María', apellido: 'Gómez', email: 'maria.gomez@example.com', suscripcion: 'Básico', estado: 'Inactivo' },
    { id: 3, nombre: 'Pedro', apellido: 'Ramírez', email: 'pedro.ramirez@example.com', suscripcion: 'Premium', estado: 'Activo' },
    { id: 4, nombre: 'Ana', apellido: 'Martínez', email: 'ana.martinez@example.com', suscripcion: 'Básico', estado: 'Inactivo' }
  ];

  const goBack = () => {
    navigate(-1); // Navega a la página anterior
  };

  return (
    <div>
      <h1 className="class-header">
        <FontAwesomeIcon icon={faClipboardList} className="header-icon" />
        Clientes
      </h1>
      {/* Aquí llamas al componente ClientTable y le pasas los datos de los clientes */}
      <ClientTable clients={clients} />
    </div>
  );
};

export default Clients;
