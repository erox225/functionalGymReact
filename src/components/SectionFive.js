import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './css/SectionFive.css';
import { sendSubscriptionForm } from '../bussinesLogic/api';

const SectionFive = ({ subscriptions, scrollRef, selectedSubscription }) => {
  // Encuentra la suscripción "Premium" o usa la primera suscripción como predeterminada si "Premium" no existe.
  const defaultSubscriptionId = subscriptions.find(sub => sub.title.toLowerCase().includes('premium'))?.id || 
                               (subscriptions.length > 0 ? subscriptions[0].id : null);
  
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState(selectedSubscription || defaultSubscriptionId);
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
  const [successMessage, setSuccessMessage] = useState('');
  const carouselRef = useRef(null);

  useEffect(() => {
    // Si `selectedSubscription` se pasa como prop, se establece como seleccionado.
    if (selectedSubscription) {
      setSelectedSubscriptionId(selectedSubscription);
    }
  }, [selectedSubscription]);

  useEffect(() => {
    // Centrar el elemento seleccionado en el carrusel cuando cambie `selectedSubscriptionId`.
    const selectedCard = carouselRef.current?.querySelector(`.SectionFive-card.selected`);
    if (selectedCard) {
      selectedCard.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [selectedSubscriptionId]);

  const handleCardClick = (id) => {
    setSelectedSubscriptionId(id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: false });
    }
  };

  const validateForm = () => {
    const { nombre, apellidos, email } = formData;
    const newFieldErrors = { nombre: false, apellidos: false, email: false };
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!validateForm()) {
      setError('Por favor, completa todos los campos correctamente.');
      return;
    }

    const dataToSend = { ...formData, suscripcion: selectedSubscriptionId };
    try {
      const response = await sendSubscriptionForm(dataToSend);
      if (response.success) {
        setSuccessMessage('Formulario enviado correctamente');
        setFormData({ nombre: '', apellidos: '', email: '' });
        setTimeout(() => setSuccessMessage(''), 5000);
      } else {
        setError('Error al enviar el formulario');
        setTimeout(() => setError(''), 5000);
      }
    } catch (error) {
      console.error('Error enviando el formulario:', error);
      setError('Ocurrió un error al enviar el formulario');
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <section className="SectionFive" ref={scrollRef}>
      <h2 className="SectionFive-title">¡Inscríbete!</h2>

      <form className="SectionFive-form" onSubmit={handleSubmit}>
        <p className={`section-five-error-message ${error ? 'visible' : ''}`}>{error}</p>

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

        <div className="SectionFive-form-group">
          <label htmlFor="suscripcion">Suscripción</label>
          <div className="SectionFive-subscription-carousel" ref={carouselRef}>
            <div className="SectionFive-carousel">
              {subscriptions.length > 0 ? (
                subscriptions.map((sub) => (
                  <div
                    key={sub.id}
                    className={`SectionFive-card ${selectedSubscriptionId === sub.id ? 'selected' : ''}`}
                    onClick={() => handleCardClick(sub.id)}
                  >
                    <h3>{sub.title}</h3>
                  </div>
                ))
              ) : (
                <p>No hay suscripciones disponibles.</p>
              )}
            </div>
          </div>
        </div>

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

        <p className={`section-five-success-message ${successMessage ? 'visible' : ''}`}>{successMessage}</p>

        <button type="submit" className="SectionFive-submit-button">Enviar</button>
      </form>
    </section>
  );
};

export default SectionFive;
