import React, { useState, useEffect } from 'react';
import './css/CrearReservaForm.css';

const CrearReservaForm = ({
  formData,
  setFormData,
  onSubmit,
  clientes,
  fetchClasesByDate // Función para obtener clases por fecha
}) => {
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [planificaciones, setPlanificaciones] = useState([]);

  // Establece la fecha actual como valor por defecto en el input de fecha
  const todayDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    // Llama a la API con la fecha actual para obtener las clases del día
    fetchClases(todayDate);
  }, []);

  // Función para obtener las clases según la fecha seleccionada
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

    if (name === "clienteId") {
      const matches = clientes.filter(cliente =>
        `${cliente.id} - ${cliente.nombre}`.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredClientes(matches);
    }

    // Llama a la API cuando se cambia la fecha
    if (name === "fechaClase") {
      fetchClases(value);
    }
  };

  // Maneja la selección de un cliente de la lista de sugerencias
  const handleSelectCliente = (cliente) => {
    setFormData((prevData) => ({
      ...prevData,
      clienteId: `${cliente.id} - ${cliente.nombre}`, // Guarda ID y nombre del cliente
    }));
    setFilteredClientes([]);
  };

  return (
    <form onSubmit={onSubmit} className="class-crear-reserva-form-container">
      {/* Selección de fecha de clase */}
      <label className="class-crear-reserva-form-label">
        Escoga fecha de clase:
        <input
          type="date"
          name="fechaClase"
          value={formData.fechaClase || todayDate}
          onChange={handleInputChange}
          required
          className="class-crear-reserva-form-input"
        />
      </label>

      {/* Selección de planificación */}
      <label className="class-crear-reserva-form-label">
        Planificación:
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
      </label>

      {/* Input de cliente con sugerencias */}
      <label className="class-crear-reserva-form-label">
        Cliente:
        <input
          type="text"
          name="clienteId"
          value={formData.clienteId || ''}
          onChange={handleInputChange}
          placeholder="Ingrese el ID o nombre del cliente"
          required
          className="class-crear-reserva-form-input"
        />
        {/* Lista de sugerencias de clientes */}
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
