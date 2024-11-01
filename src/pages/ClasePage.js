import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ClaseForm from '../components/ClaseForm';
import HeaderIcons from '../components/HeaderIcons';

const ClasePage = () => {
  const { claseId } = useParams(); // Obtén claseId de la URL
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    aforoMax: '',
    duracion: '',
    intensidad: '',
    colorClase: '#000000',
    estado: true,
    fechaCreacion: '',
    fechaModificacion: '',
  });

  useEffect(() => {
    if (claseId) {
      const fetchData = async () => {
        // Simulación de llamada a la API para obtener datos de la clase
        const data = await fetchClaseById(claseId); // Llama a tu función o API real aquí
        if (data) {
          setFormData(data); // Rellena formData con los datos obtenidos
        }
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

  const handleAddClick = () => {
    alert("Funcionalidad de agregar clickeada");
  };

  return (
    <div className="client-form-div-general">
      <HeaderIcons title="Clases" onAddClick={handleAddClick} />
      <ClaseForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        isEditMode={!!claseId}
        title={claseId ? 'Editar Clase' : 'Crear Clase'}
      />
    </div>
  );
};

// Función simulada para obtener la clase por ID
const fetchClaseById = async (id) => {
  const simulatedData = [
    {
      id: '1',
      nombre: 'Gimnasio',
      descripcion: 'Entrenamiento de fuerza y cardio',
      aforoMax: 30,
      duracion: "60",
      intensidad: 'Alta',
      colorClase: '#ff0000',
      estado: true,
      fechaCreacion: '2024-09-01',
      fechaModificacion: '2024-09-18'
    },
    {
      id: '2',
      nombre: 'Yoga',
      descripcion: 'Clase de Yoga para relajación',
      aforoMax: 20,
      duracion: "45",
      intensidad: 'Baja',
      colorClase: '#00ff00',
      estado: false,
      fechaCreacion: '2024-08-01',
      fechaModificacion: '2024-09-17'
    }
  ];
  return simulatedData.find((clase) => clase.id === id);
};

export default ClasePage;
