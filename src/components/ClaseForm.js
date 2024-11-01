import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboard, faAlignLeft, faUsers, faClock, faEye, faPalette } from '@fortawesome/free-solid-svg-icons';
import './css/ClaseForm.css';

const ClaseForm = ({ formData, setFormData, onSubmit, isEditMode, title }) => {
  const [errors, setErrors] = useState({});

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

      {/* Nombre */}
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

      {/* Descripción */}
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

      {/* Aforo Máximo */}
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

      {/* Duración */}
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

      {/* Color de la clase */}
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

      {/* Visibilidad */}
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
