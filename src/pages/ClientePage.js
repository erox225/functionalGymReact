import React, { useState, useEffect } from 'react';
import ClienteForm from '../components/ClienteForm';
import HeaderIcons from '../components/HeaderIcons';

const suscripciones = [
  { id: 1, nombre: 'Básica' },
  { id: 2, nombre: 'Premium' },
  { id: 3, nombre: 'VIP' },
];

const ClientePage = ({ clienteId = null }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    idSuscripcion: '',
    fechaNacimiento: '',
    email: '',
    fechaInicio: '',
    fechaFin: '',
    telefono: '',
  });

  useEffect(() => {
    if (clienteId) {
      const fetchData = async () => {
        const response = await fetch(`https://api.example.com/cliente/${clienteId}`);
        const data = await response.json();
        setFormData({
          nombre: data.nombre,
          apellidos: data.apellidos,
          idSuscripcion: data.idSuscripcion,
          fechaNacimiento: data.fechaNacimiento,
          email: data.email,
          fechaInicio: data.fechaInicio,
          fechaFin: data.fechaFin,
          telefono: data.telefono,
        });
      };
      fetchData();
    }
  }, [clienteId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.example.com/cliente/${clienteId || ''}`, {
        method: clienteId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(clienteId ? 'Cliente actualizado' : 'Cliente creado');
      } else {
        console.error('Error en la solicitud:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleAddClick = () => {
    alert("Funcionalidad de agregar clickeada");
  };

  return (
    <div className='client-form-div-general'>
      <HeaderIcons 
        title={clienteId ? 'Editar Cliente' : 'Crear Cliente'}
        onAddClick={handleAddClick}
      />
      <ClienteForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        suscripciones={suscripciones}
        isEditMode={!!clienteId}
      />
    </div>
  );
};

export default ClientePage;
