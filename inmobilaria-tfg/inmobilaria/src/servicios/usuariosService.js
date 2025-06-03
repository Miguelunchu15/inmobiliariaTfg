const getUsuarios = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/inmobilaria/usuarios', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener los usuarios');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

const eliminarUsuario = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/inmobilaria/usuarios/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el usuario');
    }
  } catch (error) {
    throw error;
  }
};

const getRoles = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/inmobilaria/roles', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener los roles');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

const getUsuarioById = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/inmobilaria/usuarios/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener el usuario');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

const crearUsuario = async (usuario) => {
  try {
    const response = await fetch('http://localhost:8080/api/inmobilaria/usuarios', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...usuario,
        fechaCreacion: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error('Error al crear el usuario');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

const actualizarUsuario = async (id, usuario) => {
  try {
    // Primero obtenemos el usuario actual para mantener su fecha de creación
    const usuarioActual = await getUsuarioById(id);
    
    const response = await fetch(`http://localhost:8080/api/inmobilaria/usuarios/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...usuario,
        fechaCreacion: usuarioActual.fechaCreacion // Mantenemos la fecha original
      })
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el usuario');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const usuariosService = {
  getUsuarios,
  eliminarUsuario,
  getRoles,
  getUsuarioById,
  crearUsuario,
  actualizarUsuario
}; 