import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons'; // Elige un ícono relacionado con clases
import ClassTable from '../components/ClassTable'; // Importa el componente desde 'components'
import './css/Clases.css';

const Classes = () => {
  // Simulación de clases (puedes conectar estos datos con una API real)
  const classes = [
    { 
      id: 1, 
      name: 'Gimnasio', 
      aforoMax: 30, 
      estado: 'Disponible', 
      ultimaModificacion: '2024-09-18',
      duracion: "60'",
      intensidad: 'Alta',
      descripcion: 'Sesión de gimnasio enfocada en entrenamiento de fuerza y cardio.'
    },
    { 
      id: 2, 
      name: 'Yoga', 
      aforoMax: 20, 
      estado: 'Completa', 
      ultimaModificacion: '2024-09-17',
      duracion: "45'",
      intensidad: 'Baja',
      descripcion: 'Clase de Yoga enfocada en relajación y estiramiento corporal.'
    },
    { 
      id: 3, 
      name: 'Pilates', 
      aforoMax: 15, 
      estado: 'Disponible', 
      ultimaModificacion: '2024-09-16',
      duracion: "50'",
      intensidad: 'Media',
      descripcion: 'Clase de Pilates para mejorar la flexibilidad y fortalecer el core.'
    },
  ];

  return (
    <div>
      {/* Título con ícono */}
      <h1 className="class-header">
        <FontAwesomeIcon icon={faChalkboardTeacher} className="header-icon" />
        Clases
      </h1>

      {/* Renderiza el componente de la tabla con los datos de clases */}
      <ClassTable classes={classes} />
    </div>
  );
};

export default Classes;
