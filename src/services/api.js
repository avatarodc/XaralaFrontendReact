import axios from 'axios';

export const api = axios.create({  // Ajoutez export ici
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

// Intercepteurs pour le débogage
api.interceptors.request.use(
    (config) => {
        console.log('Requête envoyée:', config);
        return config;
    },
    (error) => {
        console.error('Erreur de requête:', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        console.log('Réponse reçue:', response);
        return response;
    },
    (error) => {
        console.error('Erreur de réponse:', error);
        return Promise.reject(error);
    }
);