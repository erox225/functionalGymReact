import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faBirthdayCake, faEnvelope, faCalendarAlt, faPhone, faIdBadge } from '@fortawesome/free-solid-svg-icons';
import './css/ClienteForm.css';

// Función simulada para obtener los datos de un cliente por ID
const fetchClienteById = async (id) => {
  const allClientes = [
    { id: '1', nombre: 'Juan', apellidos: 'Pérez', email: 'juan@example.com', telefono: '123456789', idSuscripcion: '1', estado: 'activo', fechaNacimiento: '1990-01-01', fechaInicio: '2023-01-01', fechaFin: '2023-12-31' },
    { id: '2', nombre: 'Ana', apellidos: 'Gómez', email: 'ana@example.com', telefono: '987654321', idSuscripcion: '2', estado: 'baja', fechaNacimiento: '1992-05-15', fechaInicio: '2023-02-01', fechaFin: null },
  ];
  return allClientes.find(cliente => cliente.id === id);
};

// Función simulada para obtener los estados disponibles
const fetchEstados = async () => {
  return [
    { id: '1', nombre: 'activo' },
    { id: '2', nombre: 'baja' },
    { id: '3', nombre: 'usuario no activo' }
  ];
};

// Función simulada para obtener las suscripciones disponibles
const fetchSuscripciones = async () => {
  return [
    { id: '1', nombre: 'Plan premium' },
    { id: '2', nombre: 'Plan matutino' },
    { id: '3', nombre: 'Plan 12 sesiones a la semana' },
    { id: '4', nombre: 'Plan estudiantil' },
    { id: '5', nombre: 'Plan corporativo' },
    { id: '6', nombre: 'Plan Familiar' },
  ];
};

const ClienteForm = ({ onSubmit }) => {
  const { clienteId } = useParams();
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    idSuscripcion: '',
    estado: '',
    fechaNacimiento: '',
    fechaInicio: '',
    fechaFin: '',
  });
  const [errors, setErrors] = useState({});
  const [estados, setEstados] = useState([]);
  const [suscripciones, setSuscripciones] = useState([]);
  const isEditMode = Boolean(clienteId);

  useEffect(() => {
    if (isEditMode) {
      fetchClienteById(clienteId).then(clienteData => {
        if (clienteData) setFormData(clienteData);
      });
    }
  }, [clienteId, isEditMode]);

  // Cargar los estados disponibles
  useEffect(() => {
    fetchEstados().then(data => setEstados(data));
  }, []);

  // Cargar las suscripciones disponibles
  useEffect(() => {
    fetchSuscripciones().then(data => setSuscripciones(data));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'telefono' && !/^\d*$/.test(value)) return;
    if ((name === 'nombre' || name === 'apellidos') && /\d/.test(value)) return;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.nombre) formErrors.nombre = 'El nombre es obligatorio';
    if (!formData.apellidos) formErrors.apellidos = 'Los apellidos son obligatorios';
    if (!formData.idSuscripcion) formErrors.idSuscripcion = 'La suscripción es obligatoria';
    if (!formData.fechaNacimiento) formErrors.fechaNacimiento = 'La fecha de nacimiento es obligatoria';
    if (!formData.email) formErrors.email = 'El email es obligatorio';
    if (!formData.fechaInicio) formErrors.fechaInicio = 'La fecha de inicio es obligatoria';
    if (!formData.telefono) formErrors.telefono = 'El teléfono es obligatorio';

    if (formData.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      formErrors.email = 'El email no es válido';
    }
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
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="persona-form-container">
      <h4 className="planificacion-form-sub-title">{isEditMode ? 'Editar Cliente' : 'Crear Cliente'}</h4>

      <label className="persona-form-label">
        <span className="icon-text">
          <FontAwesomeIcon icon={faUser} /> Nombre:
        </span>
        <input
          type="text"
          name="nombre"
          value={formData.nombre || ''}
          onChange={handleInputChange}
          className="persona-form-input"
        />
        {errors.nombre && <p className="error-text">{errors.nombre}</p>}
      </label>

      <label className="persona-form-label">
        <span className="icon-text">
          <FontAwesomeIcon icon={faUsers} /> Apellidos:
        </span>
        <input
          type="text"
          name="apellidos"
          value={formData.apellidos || ''}
          onChange={handleInputChange}
          className="persona-form-input"
        />
        {errors.apellidos && <p className="error-text">{errors.apellidos}</p>}
      </label>

      <label className="persona-form-label">
        <span className="icon-text">
          <FontAwesomeIcon icon={faIdBadge} /> Suscripción:
        </span>
        <select
          name="idSuscripcion"
          value={formData.idSuscripcion || ''}
          onChange={handleInputChange}
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

      <label className="persona-form-label">
        <span className="icon-text">
          <FontAwesomeIcon icon={faIdBadge} /> Estado:
        </span>
        <select
          name="estado"
          value={formData.estado || ''}
          onChange={handleInputChange}
          className="persona-form-select"
        >
          <option value="">Selecciona un estado</option>
          {estados.map((estado) => (
            <option key={estado.id} value={estado.nombre}>
              {estado.nombre.charAt(0).toUpperCase() + estado.nombre.slice(1)}
            </option>
          ))}
        </select>
      </label>

      <label className="persona-form-label">
        <span className="icon-text">
          <FontAwesomeIcon icon={faBirthdayCake} /> Fecha de Nacimiento:
        </span>
        <input
          type="date"
          name="fechaNacimiento"
          value={formData.fechaNacimiento || ''}
          onChange={handleInputChange}
          className="persona-form-input"
        />
        {errors.fechaNacimiento && <p className="error-text">{errors.fechaNacimiento}</p>}
      </label>

      <label className="persona-form-label">
        <span className="icon-text">
          <FontAwesomeIcon icon={faEnvelope} /> Email:
        </span>
        <input
          type="email"
          name="email"
          value={formData.email || ''}
          onChange={handleInputChange}
          className="persona-form-input"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
      </label>

      <label className="persona-form-label">
        <span className="icon-text">
          <FontAwesomeIcon icon={faCalendarAlt} /> Fecha de Inicio:
        </span>
        <input
          type="date"
          name="fechaInicio"
          value={formData.fechaInicio || ''}
          onChange={handleInputChange}
          className="persona-form-input"
        />
        {errors.fechaInicio && <p className="error-text">{errors.fechaInicio}</p>}
      </label>

      <label className="persona-form-label">
        <span className="icon-text">
          <FontAwesomeIcon icon={faCalendarAlt} /> Fecha de Fin:
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

      <label className="persona-form-label">
        <span className="icon-text">
          <FontAwesomeIcon icon={faPhone} /> Teléfono:
        </span>
        <input
          type="tel"
          name="telefono"
          value={formData.telefono || ''}
          onChange={handleInputChange}
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
