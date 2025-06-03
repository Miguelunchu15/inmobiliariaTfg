const getInmobiliarias = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/inmobilaria/inmobiliarias', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener las inmobiliarias');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

const getInmobiliariaById = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/inmobilaria/inmobiliarias/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener la inmobiliaria');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

const crearInmobiliaria = async (inmobiliaria) => {
  try {
    const response = await fetch('http://localhost:8080/api/inmobilaria/inmobiliarias', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inmobiliaria)
    });

    if (!response.ok) {
      throw new Error('Error al crear la inmobiliaria');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

const actualizarInmobiliaria = async (id, inmobiliaria) => {
  try {
    const response = await fetch(`http://localhost:8080/api/inmobilaria/inmobiliarias/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inmobiliaria)
    });

    if (!response.ok) {
      throw new Error('Error al actualizar la inmobiliaria');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

const eliminarInmobiliaria = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/inmobilaria/inmobiliarias/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Error al eliminar la inmobiliaria');
    }
  } catch (error) {
    throw error;
  }
};

export const inmobiliariasService = {
  getInmobiliarias,
  getInmobiliariaById,
  crearInmobiliaria,
  actualizarInmobiliaria,
  eliminarInmobiliaria
}; 