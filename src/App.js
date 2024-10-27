import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard'; 
import './App.css';
import Calendar from './pages/Calendar';
import Class from './pages/Classes';
import Clients from './pages/Clients';
import Reservations from './pages/Reservations';
import Suscriptions from './pages/Suscriptions';
import ClientAccessPage from './pages/ClientAccessPage';
import FooterButtons from './components/FooterButtons';
import PlaningList from './pages/PlaningList';
import ClassDetail from './pages/ClassDetail';
import Settings from './pages/Settings';
import PlanificacionPage from './pages/PlanificacionPage';
import ClasePage from './pages/ClasePage';
import ClientePage from './pages/ClientePage';
import ReservaPage from './pages/ReservaPage'; // Importar la página de creación de reserva

function App() {
  return (
    <Router basename="/functionalGymReact">
      <div className="App">
        <Navbar />
        <Routes>
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

          {/* Ruta de planificación para creación y edición */}
          <Route path="/planificacion" element={<PlanificacionPage />} />
          <Route path="/planificacion/:planificacionId" element={<PlanificacionPage />} />

          {/* Ruta de clase para creación y edición */}
          <Route path="/clase" element={<ClasePage />} /> {/* Creación de clase */}
          <Route path="/clase/:claseId" element={<ClasePage />} /> {/* Edición de clase */}

          {/* Ruta de cliente para creación y edición */}
          <Route path="/cliente" element={<ClientePage />} /> {/* Creación de cliente */}
          <Route path="/cliente/:clienteId" element={<ClientePage />} /> {/* Edición de cliente */}

          {/* Ruta de reserva para creación y edición */}
          <Route path="/reserva" element={<ReservaPage />} /> {/* Creación de reserva */}
          <Route path="/reserva/:reservaId" element={<ReservaPage />} /> {/* Edición de reserva */}

          {/* Rutas para ver detalles */}
          <Route path="/class/:className" element={<ClassDetail />} /> 
        </Routes>
        <FooterButtons />
      </div>
    </Router>
  );
}

export default App;
