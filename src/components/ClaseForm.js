import React from 'react';
import './css/ClaseForm.css';

const ClaseForm = ({ formData, setFormData, onSubmit, isEditMode }) => {
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <form onSubmit={onSubmit} className="class-page-form-container">
      <label className="class-page-form-label">
        Nombre:
        <input
          type="text"
          name="nombre"
          value={formData.nombre || ''}
          onChange={handleInputChange}
          required
          className="class-page-form-input"
        />
      </label>

      <label className="class-page-form-label">
        Descripción:
        <textarea
          name="descripcion"
          value={formData.descripcion || ''}
          onChange={handleInputChange}
          required
          className="class-page-form-textarea"
        />
      </label>

      <label className="class-page-form-label">
        Aforo Máximo:
        <input
          type="number"
          name="aforoMax"
          value={formData.aforoMax || ''}
          onChange={handleInputChange}
          min="1"
          required
          className="class-page-form-input"
        />
      </label>

      <label className="class-page-form-label">
        Duración:
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
      </label>

      <label className="class-page-form-label">
        Estado:
        <input
          type="checkbox"
          name="estado"
          checked={formData.estado || false}
          onChange={handleInputChange}
          className="class-page-form-checkbox"
        />
        Activo
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
