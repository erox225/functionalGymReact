import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboard, faAlignLeft, faUsers, faClock, faEye, faPalette, faBolt } from '@fortawesome/free-solid-svg-icons';
import './css/ClaseForm.css';

// Función simulada para obtener la clase por ID
const fetchClaseById = async (id) => {
  const simulatedData = [
    {
      id: '1',
      nombre: 'Gimnasio',
      descripcion: 'Entrenamiento de fuerza y cardio',
      aforoMax: 30,
      duracion: '60',
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
      duracion: '45',
      intensidad: 'Baja',
      colorClase: '#00ff00',
      estado: false,
      fechaCreacion: '2024-08-01',
      fechaModificacion: '2024-09-17'
    }
  ];
  return simulatedData.find((clase) => clase.id === id);
};

const ClaseForm = ({ formData, setFormData, onSubmit, isEditMode, title }) => {
  const { claseId } = useParams();
  const [errors, setErrors] = useState({});


  useEffect(() => {
    if (isEditMode && claseId) {
      fetchClaseById(claseId).then((data) => {
        if (data) {
          setFormData(data);
        }
      });
    }
  }, [claseId, isEditMode, setFormData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const formErrors = {};

    if (!formData.nombre) formErrors.nombre = 'El nombre es obligatorio';
    if (!formData.descripcion) formErrors.descripcion = 'La descripción es obligatoria';
    if (!formData.aforoMax || formData.aforoMax <= 0) formErrors.aforoMax = 'El aforo máximo debe ser un número mayor que 0';
    if (!formData.duracion) formErrors.duracion = 'La duración es obligatoria';
    if (!formData.colorClase) formErrors.colorClase = 'El color de la clase es obligatorio';
    if (!formData.intensidad) formErrors.intensidad = 'La intensidad es obligatoria';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="class-page-form-container">
      <h4 className="planificacion-form-sub-title">{title}</h4>

      <label className="class-page-form-label">
        <span className="icon-text">
          <FontAwesomeIcon icon={faChalkboard} />
          Nombre:
        </span>
        <input
          type="text"
          name="nombre"
          value={formData.nombre || ''}
          onChange={handleInputChange}
          required
          className="class-page-form-input"
        />
        {errors.nombre && <p className="error-text">{errors.nombre}</p>}
      </label>

      <label className="class-page-form-label">
        <span className="icon-text">
          <FontAwesomeIcon icon={faAlignLeft} />
          Descripción:
        </span>
        <textarea
          name="descripcion"
          value={formData.descripcion || ''}
          onChange={handleInputChange}
          required
          className="class-page-form-textarea"
        />
        {errors.descripcion && <p className="error-text">{errors.descripcion}</p>}
      </label>

      <label className="class-page-form-label">
        <span className="icon-text">
          <FontAwesomeIcon icon={faUsers} />
          Aforo Máximo:
        </span>
        <input
          type="number"
          name="aforoMax"
          value={formData.aforoMax || ''}
          onChange={handleInputChange}
          min="1"
          required
          className="class-page-form-input"
        />
        {errors.aforoMax && <p className="error-text">{errors.aforoMax}</p>}
      </label>

      <label className="class-page-form-label">
        <span className="icon-text">
          <FontAwesomeIcon icon={faClock} />
          Duración:
        </span>
        <select
          name="duracion"
          value={formData.duracion || ''}
          onChange={handleInputChange}
          required
          className="class-page-form-select"
        >
          <option value="">Selecciona duración (min)</option>
          <option value="15">15 min</option>
          <option value="30">30 min</option>
          <option value="45">45 min</option>
          <option value="60">60 min</option>
          <option value="75">75 min</option>
          <option value="90">90 min</option>
          <option value="120">120 min</option>
        </select>
        {errors.duracion && <p className="error-text">{errors.duracion}</p>}
      </label>

      <label className="class-page-form-label">
        <span className="icon-text">
          <FontAwesomeIcon icon={faBolt} />
          Intensidad:
        </span>
        <select
          name="intensidad"
          value={formData.intensidad || ''}
          onChange={handleInputChange}
          required
          className="class-page-form-select"
        >
          <option value="">Selecciona intensidad</option>
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>
        {errors.intensidad && <p className="error-text">{errors.intensidad}</p>}
      </label>

      <label className="class-page-form-label">
        <span className="icon-text">
          <FontAwesomeIcon icon={faPalette} />
          Color de la clase:
        </span>
        <input
          type="color"
          name="colorClase"
          value={formData.colorClase || '#000000'}
          onChange={handleInputChange}
          required
          className="class-page-form-color"
        />
        {errors.colorClase && <p className="error-text">{errors.colorClase}</p>}
      </label>

      <label className="class-page-form-label-inline">
        <span className="icon-text">
          <FontAwesomeIcon icon={faEye} />
          ¿Visibilidad de la clase?
        </span>
        <input
          type="checkbox"
          name="estado"
          checked={formData.estado || false}
          onChange={handleInputChange}
          className="class-page-form-checkbox"
        />
      </label>

      {isEditMode && (
        <>
          <label className="class-page-form-label">
            Fecha de Creación:
            <input
              type="date"
              name="fechaCreacion"
              value={formData.fechaCreacion || ''}
              disabled
              className="class-page-form-input"
            />
          </label>

          <label className="class-page-form-label">
            Fecha de Modificación:
            <input
              type="date"
              name="fechaModificacion"
              value={formData.fechaModificacion || ''}
              disabled
              className="class-page-form-input"
            />
          </label>
        </>
      )}

      <button type="submit" className="class-page-form-button">
        {isEditMode ? 'Actualizar' : 'Crear'} Clase
      </button>
    </form>
  );
};

export default ClaseForm;
