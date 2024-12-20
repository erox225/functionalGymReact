import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard'; 
import Calendar from './pages/Calendar';
import Class from './pages/Classes';
import Clients from './pages/Clients';
import Reservations from './pages/Reservations';
import Suscriptions from './pages/Suscriptions';
import ClientAccessPage from './pages/ClientAccessPage';
import PlaningList from './pages/PlaningList';
import ClassDetail from './pages/ClassDetail';
import Settings from './pages/Settings';

const AnimatedRoutes = () => {
  const location = useLocation(); // Aquí usamos useLocation dentro del Router

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key} // Clave única para las animaciones
        classNames="page"   // Clases CSS definidas para las transiciones
        timeout={30000000}       // Duración de la animación
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Rutas para ver AppWeb */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/accessControl" element={<ClientAccessPage />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/class" element={<Class />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/suscriptions" element={<Suscriptions />} />
          <Route path="/planingList" element={<PlaningList />} />
          <Route path="/configurations" element={<Settings />} />
          
          {/* Rutas para ver detalles */}
          <Route path="/class/:className" element={<ClassDetail />} /> 
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default AnimatedRoutes;
