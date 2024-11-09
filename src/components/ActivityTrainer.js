// ActivityTrainer.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBolt, faClock, faEdit } from '@fortawesome/free-solid-svg-icons';

const ActivityTrainer = ({ activity, navigate }) => {
  return (
    <div className="activity">
      <div className="activity-details">
        <div className="view-class-button">
          <p className="activity-details-name" style={{ color: activity.color }}>{activity.name}</p>
          <p className="activity-details-name-by">dos</p>
          <p className="activity-details-name-trainer">{activity.trainer}</p>
        </div>
        <div className="activity-atributes-card">
          <div className="activity-aforo">
            <FontAwesomeIcon icon={faUsers} style={{ marginRight: '0.3rem' }} />
            {activity.aforoMax}/{activity.aforoActual}
          </div>
          <div className="activity-intensity" style={{ color: activity.intensityColor }}>
            <FontAwesomeIcon icon={faBolt} style={{ marginRight: '0.3rem' }} />
            {activity.intensidad}
          </div>
        </div>
      </div>
      <div className="right-activity">
        <div className="activity-time">{activity.time}</div>
        <div className="activity-duration">
          <FontAwesomeIcon icon={faClock} style={{ marginRight: '0.3rem' }} />
          {activity.duracion}
        </div>
        <div className="activity-buttons">
          <button onClick={() => navigate(`/planificacion/${activity.id}`)} className="reserve-button">
            <FontAwesomeIcon icon={faEdit} />
            <span className="boton-reservar">Editar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityTrainer;
