import React from 'react';
import ClientTable from '../components/ClientTable'; // Asegúrate de ajustar la ruta según la ubicación de ClientTable
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'; // Ícono para clientes
import { useNavigate } from 'react-router-dom';
import HeaderIcons from '../components/HeaderIcons'; // Importamos el componente HeaderIcons

const Clients = () => {
  const navigate = useNavigate();

  // Datos de ejemplo para los clientes, ahora con email y suscripción
  const clients = [
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan.perez@example.com',
      suscripcion: 'Plan premium',
      estado: 'activo',
      fechaNacimiento: '1990-01-15',
      telefono: '123456789',
      fechaInicio: '2023-01-01',
      fechaFin: null,
      imagenUrl: 'https://via.placeholder.com/100'
    },
    {
      id: 2,
      nombre: 'María',
      apellido: 'Gómez',
      email: 'maria.gomez@example.com',
      suscripcion: 'Plan matutino',
      estado: 'usuario no activo',
      fechaNacimiento: null,
      telefono: '987654321',
      fechaInicio: null,
      fechaFin: null,
      imagenUrl: 'https://via.placeholder.com/100'
    },
    {
      id: 3,
      nombre: 'Pedro',
      apellido: 'Ramírez',
      email: 'pedro.ramirez@example.com',
      suscripcion: 'Plan 12 sesiones a la semana',
      estado: 'baja',
      fechaNacimiento: '1978-03-19',
      telefono: '456789123',
      fechaInicio: '2023-03-01',
      fechaFin: '2023-12-15',
      imagenUrl: 'https://via.placeholder.com/100'
    },
    {
      id: 4,
      nombre: 'Ana',
      apellido: 'Martínez',
      email: 'ana.martinez@example.com',
      suscripcion: 'Plan estudiantil',
      estado: 'baja',
      fechaNacimiento: '1995-07-08',
      telefono: '234567890',
      fechaInicio: '2023-04-01',
      fechaFin: '2023-09-30',
      imagenUrl: 'https://via.placeholder.com/100'
    },
    {
      id: 5,
      nombre: 'Carlos',
      apellido: 'López',
      email: 'carlos.lopez@example.com',
      suscripcion: 'Plan corporativo',
      estado: 'baja',
      fechaNacimiento: '1988-12-20',
      telefono: '321654987',
      fechaInicio: '2023-05-01',
      fechaFin: '2024-05-01',
      imagenUrl: 'https://via.placeholder.com/100'
    },
    {
      id: 6,
      nombre: 'Laura',
      apellido: 'Jiménez',
      email: 'laura.jimenez@example.com',
      suscripcion: 'Plan Familiar',
      estado: 'activo',
      fechaNacimiento: '1992-11-30',
      telefono: '159753486',
      fechaInicio: '2023-06-01',
      fechaFin: null,
      imagenUrl: 'https://via.placeholder.com/100'
    }
  ];
  
  
  

  const handleAddClick = () => {
    console.log('Agregar nuevo cliente');
    // Aquí puedes implementar la funcionalidad de agregar un nuevo cliente
  };

  return (
    <div>
      {/* Usamos el componente HeaderIcons y le pasamos los props */}
      <HeaderIcons 
        title="Clientes" 
        onAddClick={handleAddClick}
      />
      
      {/* Aquí llamas al componente ClientTable y le pasas los datos de los clientes */}
      <ClientTable clients={clients} />
    </div>
  );
};

export default Clients;
