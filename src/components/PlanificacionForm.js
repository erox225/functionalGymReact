import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChalkboardTeacher, faBuilding, faClock, faSyncAlt, faCalendarCheck, faUser } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import './css/PlanificacionForm.css';

// Función simulada para obtener la planificación por ID
const fetchPlanificacionById = async (id) => {
  const simulatedData = [
    {
      id: '1',
      claseId: '1',
      calendarioId: '2',
      entrenadorId: '3',
      estanciaId: '4',
      horaInicio: '09:00',
      diaEjecucion: '2024-10-15',
      diaSemana: 'martes',
      hastaFecha: '2024-11-15',
      isClasePuntual: true,
      isClaseRecurrente: false
    }
  ];
  return simulatedData.find((planificacion) => planificacion.id === id);
};

const PlanificacionForm = ({ formData, setFormData, onSubmit, clases, calendarios, estancias, entrenadores, isEditMode, title }) => {
  const { id } = useParams(); // Obtén el id desde la URL
  const [isClasePuntual, setIsClasePuntual] = useState(true); 
  const [isClaseRecurrente, setIsClaseRecurrente] = useState(false);
  const [errors, setErrors] = useState({});

  const todayDate = new Date().toISOString().split('T')[0];
  const threeWeeksFromNow = new Date();
  threeWeeksFromNow.setDate(threeWeeksFromNow.getDate() + 21);
  const minHastaFecha = threeWeeksFromNow.toISOString().split('T')[0];

  // Cargar datos de planificación si el componente está en modo de edición
  useEffect(() => {
    if (isEditMode && id) {
      fetchPlanificacionById(id)
        .then((data) => {
          if (data) {
            setFormData(data);
            setIsClasePuntual(data.isClasePuntual);
            setIsClaseRecurrente(data.isClaseRecurrente);
          }
        })
        .catch(error => console.error("Error al cargar la planificación:", error));
    }
  }, [isEditMode, id, setFormData]);

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

  const validateForm = () => {
    const formErrors = {};
    if (!formData.claseId) formErrors.claseId = 'La clase es obligatoria';
    if (!formData.calendarioId) formErrors.calendarioId = 'El calendario es obligatorio';
    if (!formData.entrenadorId) formErrors.entrenadorId = 'El entrenador es obligatorio';
    if (!formData.estanciaId) formErrors.estanciaId = 'La estancia es obligatoria';
    if (!formData.horaInicio) formErrors.horaInicio = 'La hora de inicio es obligatoria';

    if (!isClasePuntual && !isClaseRecurrente) {
      formErrors.checkboxes = 'Debe seleccionar "Clase puntual" o "Clase recurrente"';
    }

    if (isClasePuntual && formData.diaEjecucion) {
      if (formData.diaEjecucion < todayDate) {
        formErrors.diaEjecucion = 'La fecha de ejecución debe ser igual o posterior a la fecha actual';
      }
    }

    if (isClaseRecurrente && formData.hastaFecha) {
      if (formData.hastaFecha < minHastaFecha) {
        formErrors.hastaFecha = 'La fecha de fin debe ser al menos 3 semanas después de la fecha actual';
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
    <form onSubmit={handleSubmit} className="planificacion-form-container">
      <h4 className="planificacion-form-sub-title">{title}</h4>

      <label className="planificacion-form-label">
        <span className="icon-text">
          <FontAwesomeIcon icon={faChalkboardTeacher} />
          Clase:
        </span>
        <select name="claseId" value={formData.claseId || ''} onChange={handleInputChange} required className="planificacion-form-select">
          <option value="">Selecciona una clase</option>
          {clases.map((clase) => (
            <option key={clase.id} value={clase.id}>
              {clase.nombre}
            </option>
          ))}
        </select>
        {errors.claseId && <p className="error-text">{errors.claseId}</p>}
      </label>

      <label className="planificacion-form-label">
        <span className="icon-text">
          <FontAwesomeIcon icon={faCalendarCheck} />
          Calendario:
        </span>
        <select name="calendarioId" value={formData.calendarioId || ''} onChange={handleInputChange} required className="planificacion-form-select">
          <option value="">Selecciona un calendario</option>
          {calendarios.map((calendario) => (
            <option key={calendario.id} value={calendario.id}>
              {calendario.nombre}
            </option>
          ))}
        </select>
        {errors.calendarioId && <p className="error-text">{errors.calendarioId}</p>}
      </label>

      <label className="planificacion-form-label">
        <span className="icon-text">
          <FontAwesomeIcon icon={faUser} />
          Entrenador:
        </span>
        <select name="entrenadorId" value={formData.entrenadorId || ''} onChange={handleInputChange} required className="planificacion-form-select">
          <option value="">Selecciona un entrenador</option>
          {entrenadores.map((entrenador) => (
            <option key={entrenador.id} value={entrenador.id}>
              {entrenador.nombre}
            </option>
          ))}
        </select>
        {errors.entrenadorId && <p className="error-text">{errors.entrenadorId}</p>}
      </label>

      <label className="planificacion-form-label">
        <span className="icon-text">
          <FontAwesomeIcon icon={faBuilding} />
          Estancia:
        </span>
        <select name="estanciaId" value={formData.estanciaId || ''} onChange={handleInputChange} required className="planificacion-form-select">
          <option value="">Selecciona una estancia</option>
          {estancias.map((estancia) => (
            <option key={estancia.id} value={estancia.id}>
              {estancia.nombre}
            </option>
          ))}
        </select>
        {errors.estanciaId && <p className="error-text">{errors.estanciaId}</p>}
      </label>

      <label className="planificacion-form-label">
        <span className="icon-text">
          <FontAwesomeIcon icon={faClock} />
          Hora de Inicio:
        </span>
        <input
          type="time"
          name="horaInicio"
          value={formData.horaInicio || ''}
          onChange={handleInputChange}
          required
          className="planificacion-form-input"
        />
        {errors.horaInicio && <p className="error-text">{errors.horaInicio}</p>}
      </label>

      {/* Clase puntual checkbox */}
      <label className="planificacion-form-label-inline">
        <span className="icon-text">
          <FontAwesomeIcon icon={faCalendarAlt} />
          ¿Es una clase puntual?
        </span>
        <input
          type="checkbox"
          checked={isClasePuntual}
          onChange={handleClasePuntualChange}
          className="planificacion-form-checkbox"
        />
        {errors.checkboxes && <p className="error-text">{errors.checkboxes}</p>}
      </label>

      {isClasePuntual && (
        <label className="planificacion-form-label">
          Día de Ejecución:
          <input
            type="date"
            name="diaEjecucion"
            value={formData.diaEjecucion || ''}
            onChange={handleInputChange}
            required
            min={todayDate}
            className="planificacion-form-input"
          />
          {errors.diaEjecucion && <p className="error-text">{errors.diaEjecucion}</p>}
        </label>
      )}

      {/* Clase recurrente checkbox */}
      <label className="planificacion-form-label-inline">
        <span className="icon-text">
          <FontAwesomeIcon icon={faSyncAlt} />
          ¿Esta clase se repetirá todas las semanas por un largo periodo?
        </span>
        <input
          type="checkbox"
          checked={isClaseRecurrente}
          onChange={handleClaseRecurrenteChange}
          className="planificacion-form-checkbox"
        />
        {errors.checkboxes && <p className="error-text">{errors.checkboxes}</p>}
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
              min={minHastaFecha}
              required
              className="planificacion-form-input"
            />
            {errors.hastaFecha && <p className="error-text">{errors.hastaFecha}</p>}
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
