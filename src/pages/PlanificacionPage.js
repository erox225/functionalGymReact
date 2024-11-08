import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlanificacionForm from '../components/PlanificacionForm';
import HeaderIcons from '../components/HeaderIcons';

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

const entrenadores = [
  { id: 1, nombre: 'Juan Pérez' },
  { id: 2, nombre: 'María García' },
  { id: 3, nombre: 'Carlos López' },
];

// Definir simulatedData para simular datos de planificación
const simulatedData = [
  {
    id: '1',
    claseId: '1',
    calendarioId: '2',
    entrenadorId: '3',
    estanciaId: '1',
    diaEjecucion: '2024-10-15',
    horaInicio: '09:00',
    diaSemana: 'martes',
    hastaFecha: '2024-11-15',
    permanente: false,
  },
  {
    id: '2',
    claseId: '2',
    calendarioId: '1',
    entrenadorId: '2',
    estanciaId: '3',
    diaEjecucion: '2024-10-18',
    horaInicio: '11:00',
    diaSemana: 'jueves',
    hastaFecha: '2024-12-15',
    permanente: true,
  },
];

const PlanificacionPage = () => {
  const { planificacionId } = useParams();
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
      // Simulación de carga de datos desde simulatedData
      const data = simulatedData.find(item => item.id === planificacionId);
      if (data) setFormData(data);
    }
  }, [planificacionId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(planificacionId ? 'Planificación actualizada' : 'Planificación creada');
  };

  return (
    <div className="client-form-div-general">
      <HeaderIcons title="Planificación" onAddClick={() => alert("Agregar planificación clickeado")} />
      <PlanificacionForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        clases={clases}
        calendarios={calendarios}
        estancias={estancias}
        entrenadores={entrenadores}
        isEditMode={!!planificacionId}
        title={planificacionId ? 'Editar Planificación' : 'Crear Planificación'}
      />
    </div>
  );
};

export default PlanificacionPage;
