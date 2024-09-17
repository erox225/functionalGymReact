import React from 'react';
import GridDashboard from '../components/GridDashboard'; // Importamos el componente del grid

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <h1 
        style={{ 
          textAlign: 'center', 
          fontSize: '2.0rem',  // Cambiado a camelCase y entre comillas
          marginBottom: '0.5rem', 
          marginTop: '0.5rem' 
        }}
      >
        Panel de control
      </h1>
      <GridDashboard /> {/* Llamamos al componente GridDashboard */}
    </div>
  );
};

export default Dashboard;
