import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUser, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import './css/CrearReservaForm.css';

const CrearReservaForm = ({
  formData,
  setFormData,
  onSubmit,
  clientes,
  fetchClasesByDate, // Función para obtener clases por fecha
}) => {
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [planificaciones, setPlanificaciones] = useState([]);
  const [errors, setErrors] = useState({});
  const todayDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    fetchClases(todayDate);
  }, []);

  const fetchClases = async (selectedDate) => {
    const clases = await fetchClasesByDate(selectedDate);
    setPlanificaciones(clases);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Filtrar clientes por nombre o ID
    if (name === 'clienteId') {
      const matches = clientes.filter((cliente) =>
        `${cliente.id} - ${cliente.nombre}`.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredClientes(matches);
    }

    // Cargar clases según la fecha seleccionada
    if (name === 'fechaClase') {
      fetchClases(value);
    }
  };

  const handleSelectCliente = (cliente) => {
    setFormData((prevData) => ({
      ...prevData,
      clienteId: `${cliente.id} - ${cliente.nombre}`,
    }));
    setFilteredClientes([]);
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.fechaClase) formErrors.fechaClase = 'La fecha de clase es obligatoria';
    if (!formData.planificacionId) formErrors.planificacionId = 'La planificación es obligatoria';
    if (!formData.clienteId) formErrors.clienteId = 'El cliente es obligatorio';

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
    <form onSubmit={handleSubmit} className="class-crear-reserva-form-container">
      <h4 className="planificacion-form-sub-title">Crear reserva</h4>

      {/* Selección de fecha de clase */}
      <label className="class-crear-reserva-form-label">
        <span className="icon-text">
          <FontAwesomeIcon icon={faCalendarAlt} />
          Escoga fecha de clase:
        </span>
        <input
          type="date"
          name="fechaClase"
          value={formData.fechaClase || todayDate}
          onChange={handleInputChange}
          required
          className="class-crear-reserva-form-input"
        />
        {errors.fechaClase && <p className="error-text">{errors.fechaClase}</p>}
      </label>

      {/* Selección de planificación */}
      <label className="class-crear-reserva-form-label">
        <span className="icon-text">
          <FontAwesomeIcon icon={faClipboardList} />
          Planificación:
        </span>
        <select
          name="planificacionId"
          value={formData.planificacionId || ''}
          onChange={handleInputChange}
          required
          className="class-crear-reserva-form-select"
        >
          <option value="">Selecciona una planificación</option>
          {planificaciones.map((planificacion) => (
            <option key={planificacion.id} value={planificacion.id}>
              {`${planificacion.nombreClase} - ${planificacion.fecha} - ${planificacion.hora}`}
            </option>
          ))}
        </select>
        {errors.planificacionId && <p className="error-text">{errors.planificacionId}</p>}
      </label>

      {/* Input de cliente con sugerencias */}
      <label className="class-crear-reserva-form-label">
        <span className="icon-text">
          <FontAwesomeIcon icon={faUser} />
          Cliente:
        </span>
        <input
          type="text"
          name="clienteId"
          value={formData.clienteId || ''}
          onChange={handleInputChange}
          placeholder="Ingrese el ID o nombre del cliente"
          required
          className="class-crear-reserva-form-input"
        />
        {errors.clienteId && <p className="error-text">{errors.clienteId}</p>}
        {filteredClientes.length > 0 && (
          <ul className="class-crear-reserva-form-suggestions">
            {filteredClientes.map((cliente) => (
              <li
                key={cliente.id}
                onClick={() => handleSelectCliente(cliente)}
                className="class-crear-reserva-form-suggestion-item"
              >
                {cliente.id} - {cliente.nombre}
              </li>
            ))}
          </ul>
        )}
      </label>

      <button type="submit" className="class-crear-reserva-form-button">
        Crear Reserva
      </button>
    </form>
  );
};

export default CrearReservaForm;
