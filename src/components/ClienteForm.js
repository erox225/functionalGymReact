import React from 'react';
import './css/ClienteForm.css';

const ClienteForm = ({ formData, setFormData, onSubmit, suscripciones, isEditMode }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={onSubmit} className="persona-form-container">
      {/* Nombre */}
      <label className="persona-form-label">
        Nombre:
        <input
          type="text"
          name="nombre"
          value={formData.nombre || ''}
          onChange={handleInputChange}
          required
          className="persona-form-input"
        />
      </label>

      {/* Apellidos */}
      <label className="persona-form-label">
        Apellidos:
        <input
          type="text"
          name="apellidos"
          value={formData.apellidos || ''}
          onChange={handleInputChange}
          required
          className="persona-form-input"
        />
      </label>

      {/* Suscripción */}
      <label className="persona-form-label">
        Suscripción:
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
      </label>

      {/* Fecha de Nacimiento */}
      <label className="persona-form-label">
        Fecha de Nacimiento:
        <input
          type="date"
          name="fechaNacimiento"
          value={formData.fechaNacimiento || ''}
          onChange={handleInputChange}
          required
          className="persona-form-input"
        />
      </label>

      {/* Email */}
      <label className="persona-form-label">
        Email:
        <input
          type="email"
          name="email"
          value={formData.email || ''}
          onChange={handleInputChange}
          required
          className="persona-form-input"
        />
      </label>

      {/* Fecha de Inicio */}
      <label className="persona-form-label">
        Fecha de Inicio:
        <input
          type="date"
          name="fechaInicio"
          value={formData.fechaInicio || ''}
          onChange={handleInputChange}
          required
          className="persona-form-input"
        />
      </label>

      {/* Fecha de Fin */}
      <label className="persona-form-label">
        Fecha de Fin:
        <input
          type="date"
          name="fechaFin"
          value={formData.fechaFin || ''}
          onChange={handleInputChange}
          required
          className="persona-form-input"
        />
      </label>

      {/* Teléfono */}
      <label className="persona-form-label">
        Teléfono:
        <input
          type="tel"
          name="telefono"
          value={formData.telefono || ''}
          onChange={handleInputChange}
          required
          className="persona-form-input"
        />
      </label>

      <button type="submit" className="persona-form-button">
        {isEditMode ? 'Actualizar' : 'Crear'} Cliente
      </button>
    </form>
  );
};

export default ClienteForm;
