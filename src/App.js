// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
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
import ReservaPage from './pages/ReservaPage';
import { AuthProvider } from './authContext/AuthContext';
import PrivateRoute from './authContext/PrivateRoute';
import './App.css';

function App() {
  return (
    <Router basename="/functionalGymReact">
      <AuthProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Hacer que el Dashboard sea una ruta protegida */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

            {/* Rutas protegidas */}
            <Route path="/accessControl" element={<PrivateRoute><ClientAccessPage /></PrivateRoute>} />
            <Route path="/calendar" element={<PrivateRoute><Calendar /></PrivateRoute>} />
            <Route path="/class" element={<PrivateRoute><Class /></PrivateRoute>} />
            <Route path="/clients" element={<PrivateRoute><Clients /></PrivateRoute>} />
            <Route path="/reservations" element={<PrivateRoute><Reservations /></PrivateRoute>} />
            <Route path="/suscriptions" element={<PrivateRoute><Suscriptions /></PrivateRoute>} />
            <Route path="/planingList" element={<PrivateRoute><PlaningList /></PrivateRoute>} />
            <Route path="/configurations" element={<PrivateRoute><Settings /></PrivateRoute>} />

            {/* Ruta de planificación para creación y edición */}
            <Route path="/planificacion" element={<PrivateRoute><PlanificacionPage /></PrivateRoute>} />
            <Route path="/planificacion/:planificacionId" element={<PrivateRoute><PlanificacionPage /></PrivateRoute>} />

            {/* Ruta de clase para creación y edición */}
            <Route path="/clase" element={<PrivateRoute><ClasePage /></PrivateRoute>} />
            <Route path="/clase/:claseId" element={<PrivateRoute><ClasePage /></PrivateRoute>} />

            {/* Ruta de cliente para creación y edición */}
            <Route path="/cliente" element={<PrivateRoute><ClientePage /></PrivateRoute>} />
            <Route path="/cliente/:clienteId" element={<PrivateRoute><ClientePage /></PrivateRoute>} />

            {/* Ruta de reserva para creación y edición */}
            <Route path="/reserva" element={<PrivateRoute><ReservaPage /></PrivateRoute>} />
            <Route path="/reserva/:reservaId" element={<PrivateRoute><ReservaPage /></PrivateRoute>} />

            {/* Rutas para ver detalles */}
            <Route path="/class/:className" element={<PrivateRoute><ClassDetail /></PrivateRoute>} />
          </Routes>
          <FooterButtons />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
