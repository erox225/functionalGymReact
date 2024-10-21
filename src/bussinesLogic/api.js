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
  console.log('Mock response:', formData);
  return { success: true };
};

// Funciones específicas de la API

export const fetchSubscriptions = async () => fetchData(mockSubscriptions, '/subscriptions');

export const fetchActivities = async () => fetchData(mockActivities, '/activities');

export const sendSubscriptionForm = async (formData) => sendData('/submit-subscription', formData);

export const login = async (username, password) => {
  const formData = { username, password };
  return sendData('/login', formData);
};
