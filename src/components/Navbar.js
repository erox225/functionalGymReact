import React from 'react'; 
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Importamos el icono de salir
import './css/Navbar.css';

const Navbar = () => {
  const location = useLocation(); // Para obtener la ruta actual
  const navigate = useNavigate(); // Para navegar programáticamente
  const allowedPaths = ['/dashboard', '/clients','/class','/reservations','/accessControl','/calendar'];

  const goBack = () => {
    navigate(-1); // Navega a la página anterior
  };

  return (
    <nav className="navbar">
      {/* Nombre de la app a la izquierda */}
      <div className="app-name">
        <h1>FunctionalGym</h1> {/* Aquí va el nombre de tu aplicación */}
      </div>

      <ul className="nav-links">
        {/* Mostrar las secciones solo si estamos en la página principal (LandingPage) */}
        {location.pathname === '/' && (
          <>
            <li><a href="#section1">Sección 1</a></li>
            <li><a href="#section2">Sección 2</a></li>
            <li><a href="#section3">Sección 3</a></li>
            <li><a href="#section4">Sección 4</a></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}

        {/* Mostrar el enlace solo si estamos en la página de login */}
        {location.pathname === '/login' && (
          <>
            <li><Link to="/">Volver a la ventana principal</Link></li>
          </>
        )}

        

        {/* Botón de salir siempre a la derecha con icono */}
        {allowedPaths.includes(location.pathname) && (
        <div className="nav-logout">
            <Link to="/" className="logout-btn">
            <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" /> {/* Icono de salida */}
            Salir
            </Link>
        </div>
        )}

      </ul>



      
     
    </nav>
  );
}

export default Navbar;
