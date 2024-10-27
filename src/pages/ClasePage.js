import React, { useState, useEffect } from 'react';
import ClaseForm from '../components/ClaseForm';
import HeaderIcons from '../components/HeaderIcons'; // Importamos el componente HeaderIcons

const ClasePage = ({ claseId = null }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    aforoMax: '',
    duracion: '',
    estado: true,
    fechaCreacion: '',
    fechaModificacion: '',
  });

  useEffect(() => {
    if (claseId) {
      const fetchData = async () => {
        const response = await fetch(`https://api.example.com/clase/${claseId}`);
        const data = await response.json();
        setFormData({
          nombre: data.nombre,
          descripcion: data.descripcion,
          aforoMax: data.aforoMax,
          duracion: data.duracion,
          estado: data.estado,
          fechaCreacion: data.fechaCreacion,
          fechaModificacion: data.fechaModificacion,
        });
      };
      fetchData();
    }
  }, [claseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.example.com/clase/${claseId || ''}`, {
        method: claseId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(claseId ? 'Clase actualizada' : 'Clase creada');
      } else {
        console.error('Error en la solicitud:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

    // Definir handleAddClick para el botón de agregar
    const handleAddClick = () => {
        // Aquí puedes agregar la acción que deseas realizar al hacer clic en "Agregar".
        alert("Funcionalidad de agregar clickeada");
      };

  return (
    <div>
     <HeaderIcons 
        title={claseId ? 'Editar Clase' : 'Crear Clase'}
        onAddClick={handleAddClick}
      />
      <ClaseForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        isEditMode={!!claseId}
      />
    </div>
  );
};

export default ClasePage;
