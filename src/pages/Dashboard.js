import React from 'react';
import GridDashboard from '../components/GridDashboard'; // Importamos el componente del grid
import './css/Dashboard.css'; // Importamos el archivo CSS

const Dashboard = () => {
  // Obtener la hora actual
  const currentHour = new Date().getHours();
  
  // Determinar el saludo en base a la hora
  let greeting;
  if (currentHour < 12) {
    greeting = 'Buenos días';
  } else if (currentHour < 18) {
    greeting = 'Buenas tardes';
  } else {
    greeting = 'Buenas noches';
  }

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-greeting">{greeting}, Alejandro</h1>
      <GridDashboard /> {/* Llamamos al componente GridDashboard */}
    </div>
  );
};

export default Dashboard;
