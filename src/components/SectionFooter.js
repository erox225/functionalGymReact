import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import './css/SectionFooter.css';

const SectionFooter = () => {
  return (
    <footer className="section-footer">
      <div className="footer-content">
        {/* Logo e información */}
        <div className="footer-logo-info">
          <div className="footer-logo"></div> {/* Cambiado a un div para el logo */}
          <p className="footer-description">
            Bienvenido a Train Now, donde el fitness y la pasión se unen. No somos solo un gimnasio; somos una comunidad comprometida con tu bienestar. ¡Entrena con nosotros y alcanza tu mejor versión!
          </p>
        </div>

        {/* Links de compañía */}
        <div className="footer-links">
          <h4>Compañia</h4>
          <ul>
            <li><a href="/about">Sobre nosotros</a></li>
            <li><a href="/contact">Contacto</a></li>
            <li><a href="/terms">Términos y Condiciones</a></li>
            <li><a href="/privacy">Política de Privacidad</a></li>
          </ul>
        </div>

        {/* Links de redes sociales */}
        <div className="footer-social-media">
          <h4>Social Media Link</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SectionFooter;
