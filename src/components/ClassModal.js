import React from 'react';
import './css/ClassModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUsers, faCalendarAlt, faHeartbeat } from '@fortawesome/free-solid-svg-icons';

const ClassModal = ({ classInfo, onClose }) => {
  if (!classInfo) return null;

  const { name, time, aforoMax, aforoActual, intensidad, duracion, tipo, colorClass, imagen, descripcion } = classInfo;

  const modalClassName = "modal-class-image " + imagen;
  const classIntensidad = "modal-class-items " +  intensidad;

  return (
    <div className="modal-class-overlay" onClick={onClose}>
      <div className={`modal-class-content ${colorClass}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal-class-close" onClick={onClose}>X</button>
        {imagen && <div className={modalClassName}></div>}
        <h2 className="modal-class-title">{name}</h2>
        <p className="modal-class-description">{descripcion}</p>
        <div className="modal-class-items-box">
          <p className="modal-class-items">
            <FontAwesomeIcon icon={faClock} /> 
            <span className="modal-class-items-text">
              {duracion}
            </span>
          </p>
          <p className="modal-class-items">
            <FontAwesomeIcon icon={faUsers} /> 
            <span className="modal-class-items-text">
              {aforoMax}
            </span>
          </p>
          <p className={classIntensidad}>
            <FontAwesomeIcon icon={faHeartbeat} /> 
            <span className="modal-class-items-text">
              {intensidad}
            </span>
          </p>
          <p className="modal-class-items">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span className="modal-class-items-text">
              {time}
            </span> 
          </p>
        </div>

      </div>
    </div>
  );
};

export default ClassModal;
