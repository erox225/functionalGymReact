import React from 'react';
import ClientTable from '../components/ClientTable'; // Asegúrate de ajustar la ruta según la ubicación de ClientTable

const Clients = () => {
  // Datos de ejemplo para los clientes, ahora con email y suscripción
  const clients = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', email: 'juan.perez@example.com', suscripcion: 'Premium', estado: 'Activo', imagenUrl:`https://via.placeholder.com/100` },
    { id: 2, nombre: 'María', apellido: 'Gómez', email: 'maria.gomez@example.com', suscripcion: 'Básico', estado: 'Inactivo' },
    { id: 3, nombre: 'Pedro', apellido: 'Ramírez', email: 'pedro.ramirez@example.com', suscripcion: 'Premium', estado: 'Activo' },
    { id: 4, nombre: 'Ana', apellido: 'Martínez', email: 'ana.martinez@example.com', suscripcion: 'Básico', estado: 'Inactivo' }
  ];

  return (
    <div>
      <h1
        style={{
          textAlign: 'center',
          fontSize: '2.0rem',  // Cambiado a camelCase
          marginBottom: '0.5rem',
          marginTop: '0.5rem'
        }}
      >
        Clientes
      </h1>
      {/* Aquí llamas al componente ClientTable y le pasas los datos de los clientes */}
      <ClientTable clients={clients} />
    </div>
  );
};

export default Clients;
