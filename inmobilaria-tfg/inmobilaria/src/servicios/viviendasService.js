const getViviendasByInmobiliaria = async (inmobiliariaId) => {
  try {
    const response = await fetch(`http://localhost:8080/api/inmobilaria/viviendas/idInmobiliaria/${inmobiliariaId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener las viviendas');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

const getViviendaById = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/inmobilaria/viviendas/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener la vivienda');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

const actualizarVivienda = async (id, viviendaData) => {
  try {
    const response = await fetch(`http://localhost:8080/api/inmobilaria/viviendas/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(viviendaData)
    });

    if (!response.ok) {
      throw new Error('Error al actualizar la vivienda');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

const eliminarVivienda = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/inmobilaria/viviendas/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Error al eliminar la vivienda');
    }
  } catch (error) {
    throw error;
  }
};

const crearVivienda = async (viviendaData) => {
  try {
    const response = await fetch('http://localhost:8080/api/inmobilaria/viviendas', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(viviendaData)
    });

    if (!response.ok) {
      throw new Error('Error al crear la vivienda');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const viviendasService = {
  getViviendasByInmobiliaria,
  getViviendaById,
  actualizarVivienda,
  eliminarVivienda,
  crearVivienda
}; 