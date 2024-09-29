import React from 'react';
import ClientTable from '../components/ClientTable'; // Asegúrate de ajustar la ruta según la ubicación de ClientTable
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'; // Ícono para clientes
import { useNavigate } from 'react-router-dom';
import HeaderIcons from '../components/HeaderIcons'; // Importamos el componente HeaderIcons

const Clients = () => {
  const navigate = useNavigate();

  // Datos de ejemplo para los clientes, ahora con email y suscripción
  const clients = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', email: 'juan.perez@example.com', suscripcion: 'Premium', estado: 'Activo', imagenUrl: `https://via.placeholder.com/100` },
    { id: 2, nombre: 'María', apellido: 'Gómez', email: 'maria.gomez@example.com', suscripcion: 'Básico', estado: 'Inactivo' },
    { id: 3, nombre: 'Pedro', apellido: 'Ramírez', email: 'pedro.ramirez@example.com', suscripcion: 'Premium', estado: 'Activo' },
    { id: 4, nombre: 'Ana', apellido: 'Martínez', email: 'ana.martinez@example.com', suscripcion: 'Básico', estado: 'Inactivo' }
  ];

  const handleAddClick = () => {
    console.log('Agregar nuevo cliente');
    // Aquí puedes implementar la funcionalidad de agregar un nuevo cliente
  };

  return (
    <div>
      {/* Usamos el componente HeaderIcons y le pasamos los props */}
      <HeaderIcons 
        icon={faClipboardList} 
        title="Clientes" 
        onAddClick={handleAddClick}
      />
      
      {/* Aquí llamas al componente ClientTable y le pasas los datos de los clientes */}
      <ClientTable clients={clients} />
    </div>
  );
};

export default Clients;
