import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faBirthdayCake, faEnvelope, faCalendarAlt, faPhone, faIdBadge } from '@fortawesome/free-solid-svg-icons';
import './css/ClienteForm.css';

const ClienteForm = ({ formData, setFormData, onSubmit, suscripciones, isEditMode, title }) => {
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validations
    if (name === 'telefono') {
      if (!/^\d*$/.test(value)) return; // Only allow numbers
    }
    if (name === 'nombre' || name === 'apellidos') {
      if (/\d/.test(value)) return; // Prevent numbers in name fields
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formErrors = {};

    // Required fields
    if (!formData.nombre) formErrors.nombre = 'El nombre es obligatorio';
    if (!formData.apellidos) formErrors.apellidos = 'Los apellidos son obligatorios';
    if (!formData.idSuscripcion) formErrors.idSuscripcion = 'La suscripción es obligatoria';
    if (!formData.fechaNacimiento) formErrors.fechaNacimiento = 'La fecha de nacimiento es obligatoria';
    if (!formData.email) formErrors.email = 'El email es obligatorio';
    if (!formData.fechaInicio) formErrors.fechaInicio = 'La fecha de inicio es obligatoria';
    if (!formData.telefono) formErrors.telefono = 'El teléfono es obligatorio';

    // Email format
    if (formData.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      formErrors.email = 'El email no es válido';
    }

    // Fecha Fin validation (optional but must be after fechaInicio)
    if (formData.fechaInicio && formData.fechaFin) {
      const fechaInicio = new Date(formData.fechaInicio);
      const fechaFin = new Date(formData.fechaFin);
      if (fechaFin <= fechaInicio) {
        formErrors.fechaFin = 'La fecha de fin debe ser al menos un día después de la fecha de inicio';
      }
    }

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
    <form onSubmit={handleSubmit} className="persona-form-container">
      <h4 className="planificacion-form-sub-title">{title}</h4>
      
      {/* Nombre */}
      <label className="persona-form-label">
        <span className="icon-text">
          <FontAwesomeIcon icon={faUser} />
          Nombre:
        </span>
        <input
          type="text"
          name="nombre"
          value={formData.nombre || ''}
          onChange={handleInputChange}
          required
          className="persona-form-input"
        />
        {errors.nombre && <p className="error-text">{errors.nombre}</p>}
      </label>

      {/* Apellidos */}
      <label className="persona-form-label">
        <span className="icon-text">
          <FontAwesomeIcon icon={faUsers} />
          Apellidos:
        </span>
        <input
          type="text"
          name="apellidos"
          value={formData.apellidos || ''}
          onChange={handleInputChange}
          required
          className="persona-form-input"
        />
        {errors.apellidos && <p className="error-text">{errors.apellidos}</p>}
      </label>

      {/* Suscripción */}
      <label className="persona-form-label">
        <span className="icon-text">
          <FontAwesomeIcon icon={faIdBadge} />
          Suscripción:
        </span>
        <select
          name="idSuscripcion"
          value={formData.idSuscripcion || ''}
          onChange={handleInputChange}
          required
          className="persona-form-select"
        >
          <option value="">Selecciona una suscripción</option>
          {suscripciones.map((suscripcion) => (
            <option key={suscripcion.id} value={suscripcion.id}>
              {suscripcion.nombre}
            </option>
          ))}
        </select>
        {errors.idSuscripcion && <p className="error-text">{errors.idSuscripcion}</p>}
      </label>

      {/* Fecha de Nacimiento */}
      <label className="persona-form-label">
        <span className="icon-text">
          <FontAwesomeIcon icon={faBirthdayCake} />
          Fecha de Nacimiento:
        </span>
        <input
          type="date"
          name="fechaNacimiento"
          value={formData.fechaNacimiento || ''}
          onChange={handleInputChange}
          required
          className="persona-form-input"
        />
        {errors.fechaNacimiento && <p className="error-text">{errors.fechaNacimiento}</p>}
      </label>

      {/* Email */}
      <label className="persona-form-label">
        <span className="icon-text">
          <FontAwesomeIcon icon={faEnvelope} />
          Email:
        </span>
        <input
          type="email"
          name="email"
          value={formData.email || ''}
          onChange={handleInputChange}
          required
          className="persona-form-input"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
      </label>

      {/* Fecha de Inicio */}
      <label className="persona-form-label">
        <span className="icon-text">
          <FontAwesomeIcon icon={faCalendarAlt} />
          Fecha de Inicio:
        </span>
        <input
          type="date"
          name="fechaInicio"
          value={formData.fechaInicio || ''}
          onChange={handleInputChange}
          required
          className="persona-form-input"
        />
        {errors.fechaInicio && <p className="error-text">{errors.fechaInicio}</p>}
      </label>

      {/* Fecha de Fin */}
      <label className="persona-form-label">
        <span className="icon-text">
          <FontAwesomeIcon icon={faCalendarAlt} />
          Fecha de Fin:
        </span>
        <input
          type="date"
          name="fechaFin"
          value={formData.fechaFin || ''}
          onChange={handleInputChange}
          className="persona-form-input"
        />
        {errors.fechaFin && <p className="error-text">{errors.fechaFin}</p>}
      </label>

      {/* Teléfono */}
      <label className="persona-form-label">
        <span className="icon-text">
          <FontAwesomeIcon icon={faPhone} />
          Teléfono:
        </span>
        <input
          type="tel"
          name="telefono"
          value={formData.telefono || ''}
          onChange={handleInputChange}
          required
          className="persona-form-input"
        />
        {errors.telefono && <p className="error-text">{errors.telefono}</p>}
      </label>

      <button type="submit" className="persona-form-button">
        {isEditMode ? 'Actualizar' : 'Crear'} Cliente
      </button>
    </form>
  );
};

export default ClienteForm;
