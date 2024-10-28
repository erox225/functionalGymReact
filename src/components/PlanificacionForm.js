import React, { useState } from 'react';
import './css/PlanificacionForm.css';

const PlanificacionForm = ({ formData, setFormData, onSubmit, clases, calendarios, estancias, entrenadores, isEditMode }) => {
  const [isClasePuntual, setIsClasePuntual] = useState(false);
  const [isClaseRecurrente, setIsClaseRecurrente] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleClasePuntualChange = () => {
    setIsClasePuntual((prev) => !prev);
    setIsClaseRecurrente(false);
    setFormData((prevData) => ({
      ...prevData,
      diaEjecucion: isClasePuntual ? '' : prevData.diaEjecucion,
    }));
  };

  const handleClaseRecurrenteChange = () => {
    setIsClaseRecurrente((prev) => !prev);
    setIsClasePuntual(false);
    setFormData((prevData) => ({
      ...prevData,
      diaSemana: !isClaseRecurrente ? '' : prevData.diaSemana,
      hastaFecha: !isClaseRecurrente ? '' : prevData.hastaFecha,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isClasePuntual && !isClaseRecurrente) {
      alert('Debes seleccionar "Clase puntual" o "Clase recurrente"');
      return;
    }
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="planificacion-form-container">
      <label className="planificacion-form-label">
        Clase:
        <select name="claseId" value={formData.claseId || ''} onChange={handleInputChange} required className="planificacion-form-select">
          <option value="">Selecciona una clase</option>
          {clases.map((clase) => (
            <option key={clase.id} value={clase.id}>
              {clase.nombre}
            </option>
          ))}
        </select>
      </label>

      <label className="planificacion-form-label">
        Calendario:
        <select name="calendarioId" value={formData.calendarioId || ''} onChange={handleInputChange} required className="planificacion-form-select">
          <option value="">Selecciona un calendario</option>
          {calendarios.map((calendario) => (
            <option key={calendario.id} value={calendario.id}>
              {calendario.nombre}
            </option>
          ))}
        </select>
      </label>

      <label className="planificacion-form-label">
        Entrenador:
        <select name="entrenadorId" value={formData.entrenadorId || ''} onChange={handleInputChange} required className="planificacion-form-select">
          <option value="">Selecciona un entrenador</option>
          {entrenadores.map((entrenador) => (
            <option key={entrenador.id} value={entrenador.id}>
              {entrenador.nombre}
            </option>
          ))}
        </select>
      </label>

      <label className="planificacion-form-label">
        Estancia:
        <select name="estanciaId" value={formData.estanciaId || ''} onChange={handleInputChange} required className="planificacion-form-select">
          <option value="">Selecciona una estancia</option>
          {estancias.map((estancia) => (
            <option key={estancia.id} value={estancia.id}>
              {estancia.nombre}
            </option>
          ))}
        </select>
      </label>

      <label className="planificacion-form-label">
        Hora de Inicio:
        <input
          type="time"
          name="horaInicio"
          value={formData.horaInicio || ''}
          onChange={handleInputChange}
          required
          className="planificacion-form-input"
        />
      </label>

      {/* Checkboxes de selección de clase */}
      <label className="planificacion-form-label-inline">
      <span>¿Es una clase puntual?</span>
        <input
          type="checkbox"
          checked={isClasePuntual}
          onChange={handleClasePuntualChange}
          className="planificacion-form-checkbox"
        />
        
      </label>

      {/* Solo mostrar Día de Ejecución si isClasePuntual está activado */}
      {isClasePuntual && (
        <label className="planificacion-form-label">
          Día de Ejecución:
          <input
            type="date"
            name="diaEjecucion"
            value={formData.diaEjecucion || ''}
            onChange={handleInputChange}
            required
            className="planificacion-form-input"
          />
        </label>
      )}

      <label className="planificacion-form-label-inline">
      <span>¿Esta clase se repetirá todas las semanas por un largo periodo?</span>
        <input
          type="checkbox"
          checked={isClaseRecurrente}
          onChange={handleClaseRecurrenteChange}
          className="planificacion-form-checkbox"
        />
        
      </label>

      {isClaseRecurrente && (
        <>
          <label className="planificacion-form-label">
            Día de la Semana:
            <select name="diaSemana" value={formData.diaSemana || ''} onChange={handleInputChange} required className="planificacion-form-select">
              <option value="">Selecciona un día</option>
              <option value="lunes">Lunes</option>
              <option value="martes">Martes</option>
              <option value="miércoles">Miércoles</option>
              <option value="jueves">Jueves</option>
              <option value="viernes">Viernes</option>
              <option value="sábado">Sábado</option>
              <option value="domingo">Domingo</option>
            </select>
          </label>

          <label className="planificacion-form-label">
            Hasta Fecha:
            <input
              type="date"
              name="hastaFecha"
              value={formData.hastaFecha || ''}
              onChange={handleInputChange}
              min={formData.diaEjecucion}
              max="2027-12-31"
              required
              className="planificacion-form-input"
            />
          </label>
        </>
      )}

      <button type="submit" className="planificacion-form-button">
        {isEditMode ? 'Actualizar' : 'Crear'} Planificación
      </button>
    </form>
  );
};

export default PlanificacionForm;
