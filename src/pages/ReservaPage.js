import React, { useState } from 'react';
import CrearReservaForm from '../components/CrearReservaForm';
import HeaderIcons from '../components/HeaderIcons'; // Importamos el componente HeaderIcons

const clientes = [
  { id: 101, nombre: 'Juan Pérez' },
  { id: 102, nombre: 'María García' },
  { id: 103, nombre: 'Carlos López' },
];

// Simulación de una función para obtener clases desde una API
const fetchClasesByDate = async (date) => {
    try {
      const response = await fetch(`https://api.example.com/clases?fecha=${date}`);
      if (!response.ok) {
        throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return data.map(clase => ({
        id: clase.id,
        nombreClase: clase.nombreClase,
        fecha: clase.fecha,
        hora: clase.hora,
      }));
    } catch (error) {
      console.error('Error al obtener las clases:', error.message);
      alert('Hubo un problema al conectar con la API. Verifica tu conexión o la URL.');
      return [];
    }
  };

    // Definir handleAddClick para el botón de agregar
    const handleAddClick = () => {
        // Aquí puedes agregar la acción que deseas realizar al hacer clic en "Agregar".
        alert("Funcionalidad de agregar clickeada");
      };

const ReservaPage = () => {
  const [formData, setFormData] = useState({
    fechaClase: '',
    planificacionId: '',
    clienteId: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api.example.com/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Reserva creada exitosamente');
      } else {
        console.error('Error en la solicitud:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div>
     <HeaderIcons 
        title="Reservas" 
        onAddClick={handleAddClick}
      />
      <CrearReservaForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        clientes={clientes}
        fetchClasesByDate={fetchClasesByDate} // Pasa la función de obtención de clases como prop
      />
    </div>
  );
};

export default ReservaPage;
