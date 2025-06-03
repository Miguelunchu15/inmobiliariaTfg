const getTipos = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/inmobilaria/tipo', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener los tipos');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

const getEstados = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/inmobilaria/estados', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener los estados');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

const getLocalidades = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/inmobilaria/localidades', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener las localidades');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const catalogosService = {
  getTipos,
  getEstados,
  getLocalidades
}; 