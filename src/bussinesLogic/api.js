// Importa los datos mock
import mockSubscriptions from '../mockData/subscriptions.json';
import mockActivities from '../mockData/activities.json';

const apiEnv = process.env.REACT_APP_ENV;
const apiUrl = process.env.REACT_APP_API_URL;

// Función genérica para manejar llamadas GET (mock o reales)
const fetchData = async (mockData, apiEndpoint) => {
  return apiEnv === 'mock'
    ? mockData
    : await requestData(`${apiUrl}${apiEndpoint}`, 'GET');
};

// Función genérica para manejar envíos de datos (POST)
const sendData = async (apiEndpoint, formData) => {
  return apiEnv === 'mock'
    ? mockResponse(formData)
    : await requestData(`${apiUrl}${apiEndpoint}`, 'POST', formData);
};

// Función genérica para hacer fetch de cualquier método (GET, POST, etc.)
const requestData = async (url, method, body = null) => {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      ...(body && { body: JSON.stringify(body) }),
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Error in ${method} request to ${url}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error in request to ${url}:`, error);
    return { success: false };
  }
};

// Función simulada para manejar respuestas mock
const mockResponse = (formData) => {
  const { username, password } = formData;

  // Generación de un token JWT simulado
  const generateMockToken = () => {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." + 
           "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ." +
           "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  };

  // Comprobación básica de usuario y contraseña
  if (username === 'trainer' && password === '123') {
    return { success: true, role: 1, tokenJWT: generateMockToken() }; // 1 = Entrenador
  } else if (username === 'client' && password === '123') {
    return { success: true, role: 2, tokenJWT: generateMockToken() }; // 2 = Cliente
  } else {
    return { success: false }; // Credenciales incorrectas
  }
};

// Funciones específicas de la API

export const fetchSubscriptions = async () => fetchData(mockSubscriptions, '/subscriptions');

export const fetchActivities = async () => fetchData(mockActivities, '/activities');

export const sendSubscriptionForm = async (formData) => sendData('/submit-subscription', formData);

export const login = async (username, password) => {
  const formData = { username, password };
  return sendData('/login', formData);
};
