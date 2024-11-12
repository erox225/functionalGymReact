    // CredentialModal.js
    import React from 'react';
    import './css/CredentialModal.css';
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

    const CredentialModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
        <div className="modal-content-credential-modal">
            <p className="title-content-credential-modal">¿Deseas enviar las credenciales al cliente?</p>
            <div className="modal-content-credential-confirm-button-box">
            <button onClick={onClose} className="modal-content-credential-close-button">
            <FontAwesomeIcon icon={faTimes} style={{ marginRight: '0.5rem' }} />
                Cancelar</button>
            <button onClick={onConfirm} className="modal-content-credential-confirm-button">
            <FontAwesomeIcon icon={faPaperPlane} style={{ marginRight: '0.5rem' }} />
                Enviar</button> 
            </div>
        </div>
        </div>
    );
    };

    export default CredentialModal;
