import React, { useState, useEffect } from 'react';
import PlanificacionForm from '../components/PlanificacionForm';
import HeaderIcons from '../components/HeaderIcons'; // Importamos el componente HeaderIcons

const clases = [
  { id: 1, nombre: 'Yoga' },
  { id: 2, nombre: 'Pilates' },
  { id: 3, nombre: 'BodyCombat' },
];

const calendarios = [
  { id: 1, nombre: 'Enero' },
  { id: 2, nombre: 'Febrero' },
  { id: 3, nombre: 'Marzo' },
];

const estancias = [
  { id: 1, nombre: 'Sala Principal' },
  { id: 2, nombre: 'Sala de Yoga' },
  { id: 3, nombre: 'Sala de Pilates' },
];

// Lista de entrenadores
const entrenadores = [
  { id: 1, nombre: 'Juan Pérez' },
  { id: 2, nombre: 'María García' },
  { id: 3, nombre: 'Carlos López' },
];

const PlanificacionPage = ({ planificacionId = null }) => {
  const [formData, setFormData] = useState({
    claseId: '',
    calendarioId: '',
    entrenadorId: '',
    estanciaId: '',
    diaEjecucion: '',
    horaInicio: '',
    diaSemana: '',
    hastaFecha: '',
    permanente: false,
  });

  useEffect(() => {
    if (planificacionId) {
      const fetchData = async () => {
        const response = await fetch(`https://api.example.com/planificacion/${planificacionId}`);
        const data = await response.json();
        setFormData({
          claseId: data.claseId,
          calendarioId: data.calendarioId,
          entrenadorId: data.entrenadorId,
          estanciaId: data.estanciaId,
          diaEjecucion: data.diaEjecucion,
          horaInicio: data.horaInicio,
          diaSemana: data.diaSemana,
          hastaFecha: data.hastaFecha,
          permanente: data.permanente,
        });
      };
      fetchData();
    }
  }, [planificacionId]);

  // Definir handleAddClick para el botón de agregar
  const handleAddClick = () => {
    // Aquí puedes agregar la acción que deseas realizar al hacer clic en "Agregar".
    alert("Funcionalidad de agregar clickeada");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.diaEjecucion && !formData.diaSemana) {
      alert('Selecciona al menos "Clase puntual" o "Clase recurrente".');
      return;
    }

    try {
      const response = await fetch(`https://api.example.com/planificacion/${planificacionId || ''}`, {
        method: planificacionId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(planificacionId ? 'Planificación actualizada' : 'Planificación creada');
      } else {
        console.error('Error en la solicitud:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className='client-form-div-general'>
      {/* Usamos el componente HeaderIcons y le pasamos los props */}
      <HeaderIcons 
        title={'Calendario'} 
        onAddClick={handleAddClick}
      />
      <PlanificacionForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        clases={clases}
        calendarios={calendarios}
        estancias={estancias}
        entrenadores={entrenadores} // Pasar entrenadores como prop
        isEditMode={!!planificacionId}
        title={planificacionId ? 'Editar Planificación' : 'Crear Planificación'}
      />
    </div>
  );
};

export default PlanificacionPage;
