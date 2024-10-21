import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { login } from '../bussinesLogic/api'; // Importa la función login
import './css/LoginForm.css'; // Importa el archivo CSS

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await login(username, password);

      if (response.success) {
        console.log('Login exitoso:', response);
        // Redirige al dashboard después del login
        navigate('/dashboard');
      } else {
        setErrorMessage('Error de autenticación. Por favor, verifica tu usuario y contraseña.');
      }
    } catch (error) {
      console.error('Error durante el login:', error);
      setErrorMessage('Ocurrió un error durante el login.');
    }
  };

  return (
    <div className="form-login-container">
      <form onSubmit={handleSubmit} className="form-login-form">
        <h2 className="form-login-title">Iniciar Sesión</h2>

        {errorMessage && <p className="form-login-error">{errorMessage}</p>} {/* Mostrar mensaje de error */}

        <div className="form-login-group">
          <label htmlFor="username" className="form-login-label">Usuario:</label>
          <div className="form-login-input-container">
            <FontAwesomeIcon icon={faUser} className="form-login-icon" />
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-login-input"
              placeholder="Ingresa tu usuario"
            />
          </div>
        </div>

        <div className="form-login-group">
          <label htmlFor="password" className="form-login-label">Contraseña:</label>
          <div className="form-login-input-container">
            <FontAwesomeIcon icon={faLock} className="form-login-icon" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-login-input"
              placeholder="Ingresa tu contraseña"
            />
          </div>
        </div>

        <button type="submit" className="form-login-button">
          Ingresar
          <FontAwesomeIcon icon={faArrowRight} className="form-login-arrow-icon" />
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
