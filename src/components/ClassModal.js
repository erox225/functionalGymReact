import React from 'react';
import './css/ClassModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUsers, faCalendarAlt, faHeartbeat, faClipboardList, faCalendarPlus, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../authContext/AuthContext';

const ClassModal = ({ classInfo, onClose, reserveActivity, loadingActivityId }) => {
  const location = useLocation();
  const { userRole } = useAuth();

  if (!classInfo) return null;

  const { name, time, aforoMax, aforoActual, intensidad, duracion, tipo, colorClass, imagen, descripcion, estado } = classInfo;

  const modalClassName = "modal-class-image " + imagen;
  const classIntensidad = "modal-class-items " + intensidad;

  // Determina el color del aforo dependiendo de si ha alcanzado el límite
  const aforoColorClass = aforoActual >= aforoMax ? 'aforo-max-capacity' : '';

  // Botón de acción de acuerdo al estado
  const renderActionButton = () => {
    if (estado === 'Libre') {
      return (
        <button
          onClick={() => reserveActivity(classInfo.id)}
          className="modal-reservar-button-2"
          disabled={loadingActivityId === classInfo.id}
          style={{
            backgroundColor: '#d4f7dc',
            color: '#1b5e20',
            border: '1px solid #388e3c'
          }}
        >
          <FontAwesomeIcon icon={faCalendarPlus} />
          <span className="boton-reservar">Reservar</span>
        </button>
      );
    } else if (estado === 'En cola') {
      return (
        <button
          className="modal-reservar-button-2 queue-button"
          style={{
            backgroundColor: '#FF9800',
            color: '#FFFFFF',
            border: '1px solid #d17a00'
          }}
        >
          <FontAwesomeIcon icon={faCalendarPlus} />
          <span className="boton-reservar">En cola</span>
        </button>
      );
    } else if (estado === 'Inscrito') {
      return (
        <button
          className="modal-reservar-button-2 enrolled-button"
          style={{
            backgroundColor: '#e0f7fa',
            color: '#0288d1',
            border: '1px solid #0288d1',
            cursor: 'default'
          }}
          disabled
        >
          <FontAwesomeIcon icon={faCheckCircle} />
          <span className="boton-reservar">Inscrito</span>
        </button>
      );
    }
  };

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
            <span className="modal-class-items-text">{duracion}</span>
          </p>
          <p className={`modal-class-items ${aforoColorClass}`}>
            <FontAwesomeIcon icon={faUsers} />
            <span className="modal-class-items-text">{aforoMax} / {aforoActual}</span>
          </p>
          <p className={classIntensidad}>
            <FontAwesomeIcon icon={faHeartbeat} />
            <span className="modal-class-items-text">{intensidad}</span>
          </p>
          <p className="modal-class-items">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span className="modal-class-items-text">{time}</span>
          </p>
        </div>

        {location.pathname === '/dashboard' && userRole === 2 && aforoActual >= aforoMax && (estado === 'Libre' || estado === 'En cola') && (
          <p className="aforo-warning">
            Al entrar en la cola si hay una plaza te inscribiremos automáticamente
          </p>
        )}

        {/* Mostrar el botón y el mensaje de acuerdo al estado y aforo */}
        {location.pathname === '/dashboard' && userRole === 2 && renderActionButton()}

      </div>
    </div>
  );
};

export default ClassModal;
