import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './css/SectionFive.css';
import { sendSubscriptionForm } from '../bussinesLogic/api'; // Importa la función para enviar el formulario

const SectionFive = ({ subscriptions }) => {
  // Inicializa el estado con el primer ID de suscripción, si existe
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  // Crear variables del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: ''
  });

  const [fieldErrors, setFieldErrors] = useState({
    nombre: false,
    apellidos: false,
    email: false
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Nuevo estado para el mensaje de éxito
  const carouselRef = useRef(null);

  // Al cargar la página, asegurarse de que la primera suscripción esté seleccionada
  useEffect(() => {
    if (subscriptions.length > 0 && !selectedSubscription) {
      setSelectedSubscription(subscriptions[0].id);
    }
  }, [subscriptions, selectedSubscription]);

  // Función para manejar la selección de una tarjeta de suscripción
  const handleCardClick = (id) => {
    setSelectedSubscription(id);
  };

  // Manejar el cambio de los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Limpiar el error del campo cuando el usuario comience a escribir
    if (fieldErrors[name]) {
      setFieldErrors({
        ...fieldErrors,
        [name]: false
      });
    }
  };

  // Validar los campos del formulario
  const validateForm = () => {
    const { nombre, apellidos, email } = formData;
    const newFieldErrors = {
      nombre: false,
      apellidos: false,
      email: false
    };

    let formIsValid = true;

    if (!nombre) {
      newFieldErrors.nombre = true;
      formIsValid = false;
    }
    if (!apellidos) {
      newFieldErrors.apellidos = true;
      formIsValid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      newFieldErrors.email = true;
      formIsValid = false;
    }

    setFieldErrors(newFieldErrors);
    return formIsValid;
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Limpiar mensajes anteriores
    setError('');
    setSuccessMessage('');

    // Validar el formulario
    const isFormValid = validateForm();
    if (!isFormValid) {
      setError('Por favor, completa todos los campos correctamente.');
      return;
    }

    // Si no hay errores, proceder al envío
    const dataToSend = {
      ...formData,
      suscripcion: selectedSubscription
    };

    try {
      const response = await sendSubscriptionForm(dataToSend); // Llama a la función para enviar los datos
      if (response.success) {
        setSuccessMessage('Formulario enviado correctamente');
        setFormData({
          nombre: '',
          apellidos: '',
          email: ''
        });
        setTimeout(() => setSuccessMessage(''), 5000);
      } else {
        setError('Error al enviar el formulario');
        setTimeout(() => setError(''), 5000); // Ocultar el error después de 5 segundos
      }
    } catch (error) {
      console.error('Error enviando el formulario:', error);
      setError('Ocurrió un error al enviar el formulario');
      setTimeout(() => setError(''), 5000); // Ocultar el error después de 5 segundos
    }
  };

  return (
    <section className="SectionFive">
      <h2 className="SectionFive-title">¡Inscribete!</h2>

      {/* Formulario */}
      <form className="SectionFive-form" onSubmit={handleSubmit}>

      {/* Mostrar mensaje de error */}
      <p className={`section-five-error-message ${error ? 'visible' : ''}`}>
        {error}
      </p>

        {/* Nombre */}
        <div className="SectionFive-form-group">
          <label htmlFor="nombre">Nombre</label>
          <FontAwesomeIcon icon={faUser} className="icon" />
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            placeholder="Escribe tu nombre"
            className={fieldErrors.nombre ? 'input-error' : ''}
          />
        </div>

        {/* Apellidos */}
        <div className="SectionFive-form-group">
          <label htmlFor="apellidos">Apellidos</label>
          <FontAwesomeIcon icon={faUser} className="icon" />
          <input
            type="text"
            id="apellidos"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleInputChange}
            placeholder="Escribe tus apellidos"
            className={fieldErrors.apellidos ? 'input-error' : ''}
          />
        </div>

        {/* Carrusel de suscripciones */}
        <div className="SectionFive-form-group">
          <label htmlFor="suscripcion">Suscripción</label>
          <div className="SectionFive-subscription-carousel" ref={carouselRef}>
            <div className="SectionFive-carousel">
              {subscriptions.length > 0 ? (
                subscriptions.map((sub) => (
                  <div
                    key={sub.id}
                    className={`SectionFive-card ${selectedSubscription === sub.id ? 'selected' : ''}`}
                    onClick={() => handleCardClick(sub.id)}
                  >
                    <h3>{sub.title}</h3> {/* Solo muestra el nombre de la suscripción */}
                  </div>
                ))
              ) : (
                <p>No hay suscripciones disponibles.</p> /* Mostrar un mensaje si no hay suscripciones */
              )}
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="SectionFive-form-group">
          <label htmlFor="email">Email</label>
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Escribe tu email"
            className={fieldErrors.email ? 'input-error' : ''}
          />
        </div>

        {/* Campo oculto para enviar la suscripción seleccionada */}
        <input type="hidden" name="suscripcion" value={selectedSubscription || ''} />

      {/* Mostrar mensaje de éxito */}
      <p className={`section-five-success-message ${successMessage ? 'visible' : ''}`}>
        {successMessage}
      </p>

        {/* Botón de enviar */}
        <button type="submit" className="SectionFive-submit-button">
          Enviar
        </button>
      </form>
    </section>
  );
};

export default SectionFive;
