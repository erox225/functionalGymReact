import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faCalendarAlt, faIdBadge } from '@fortawesome/free-solid-svg-icons'; // Importar iconos
import './css/SectionFive.css';

const SectionFive = ({ subscriptions }) => {
  return (
    <section className="SectionFive">
      <h2 className="SectionFive-title">Formulario de Suscripción</h2>
      <form className="SectionFive-form">
        {/* Nombre */}
        <div className="SectionFive-form-group">
          <label htmlFor="nombre">Nombre</label>
          <FontAwesomeIcon icon={faUser} className="icon" />
          <input type="text" id="nombre" name="nombre" placeholder="Escribe tu nombre" />
        </div>

        {/* Apellidos */}
        <div className="SectionFive-form-group">
          <label htmlFor="apellidos">Apellidos</label>
          <FontAwesomeIcon icon={faUser} className="icon" />
          <input type="text" id="apellidos" name="apellidos" placeholder="Escribe tus apellidos" />
        </div>

        {/* Suscripción */}
        <div className="SectionFive-form-group">
          <label htmlFor="suscripcion">Suscripción</label>
          <FontAwesomeIcon icon={faIdBadge} className="icon" />
          <select id="suscripcion" name="suscripcion">
            {subscriptions.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.title}
              </option>
            ))}
          </select>
        </div>

        {/* Fecha de inicio */}
        <div className="SectionFive-form-group">
          <label htmlFor="fechaInicio">Fecha de Inicio</label>
          <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
          <input type="date" id="fechaInicio" name="fechaInicio" />
        </div>

        {/* Fecha de fin */}
        <div className="SectionFive-form-group">
          <label htmlFor="fechaFin">Fecha de Fin</label>
          <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
          <input type="date" id="fechaFin" name="fechaFin" />
        </div>

        {/* Teléfono */}
        <div className="SectionFive-form-group">
          <label htmlFor="telefono">Teléfono</label>
          <FontAwesomeIcon icon={faPhone} className="icon" />
          <input type="tel" id="telefono" name="telefono" placeholder="Escribe tu teléfono" />
        </div>

        {/* Email */}
        <div className="SectionFive-form-group">
          <label htmlFor="email">Email</label>
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          <input type="email" id="email" name="email" placeholder="Escribe tu email" />
        </div>

        {/* Botón de enviar */}
        <button type="submit" className="SectionFive-submit-button">
          Enviar
        </button>
      </form>
    </section>
  );
};

export default SectionFive;
