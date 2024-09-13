import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard'; 
import './App.css';
import Calendar from './pages/Calendar';
import Class from './pages/Class';
import Clients from './pages/Clients';
import Reservations from './pages/Reservations';
import Suscriptions from './pages/Suscriptions';
import AccessControl from './pages/AccessControl';
import FooterButtons from './components/FooterButtons';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/accessControl" element={<AccessControl />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/class" element={<Class />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/suscriptions" element={<Suscriptions />} />
        </Routes>
        {/* El footer se renderiza solo si la ruta lo permite */}
        <FooterButtons />
      </div>
    </Router>
  );
}

export default App;