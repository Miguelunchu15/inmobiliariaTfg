import { authService } from './authService';

const getInmobiliariaByUserId = async () => {
  try {
    const userId = authService.getId();
    if (!userId) {
      console.error('No se encontró ID de usuario');
      return null;
    }

    const response = await fetch(`http://localhost:8080/api/inmobilaria/inmobiliarias/idUsuario/${userId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      mode: 'cors',
    });

    // Si es 404, significa que el usuario no tiene inmobiliaria asociada (es admin)
    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    // Verificar si hay contenido antes de intentar parsear JSON
    const text = await response.text();
    if (!text) {
      console.log('Respuesta vacía del servidor');
      return null;
    }

    try {
      const data = JSON.parse(text);
      if (data && data.id) {
        localStorage.setItem('inmobiliariaId', data.id);
        return data;
      }
      return null;
    } catch (e) {
      console.error('Error al parsear JSON:', e);
      console.log('Texto recibido:', text);
      return null;
    }
  } catch (error) {
    console.error('Error al obtener datos de inmobiliaria:', error);
    return null;
  }
};

const getInmobiliariaId = () => {
  return localStorage.getItem('inmobiliariaId');
};

const clearInmobiliariaData = () => {
  localStorage.removeItem('inmobiliariaId');
};

export const inmobiliariaService = {
  getInmobiliariaByUserId,
  getInmobiliariaId,
  clearInmobiliariaData,
}; 