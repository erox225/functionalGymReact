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
import Settings from  './pages/Settings';

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
          

          {/* Rutas para ver detalles */}
          <Route path="/class/:className" element={<ClassDetail />} /> 
        </Routes>
        {/* El footer se renderiza solo si la ruta lo permite */}
        <FooterButtons />
      </div>
    </Router>
  );
}

export default App;