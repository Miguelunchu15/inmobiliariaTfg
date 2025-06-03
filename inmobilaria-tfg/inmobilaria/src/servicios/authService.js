const login = async (email, password) => {
  try {
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include', 
      mode: 'cors', 
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Credenciales incorrectas');
      } else if (response.status === 404) {
        throw new Error('Servicio no disponible');
      } else {
        throw new Error('Error en el servidor');
      }
    }

    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('id', data.id_usuario);
      localStorage.setItem('email', email);
      return data;
    } else {
      throw new Error('Token no recibido del servidor');
    }
  } catch (error) {
    console.error('Error de autenticación:', error.message);
    if (error.message === 'Failed to fetch') {
      throw new Error('No se puede conectar al servidor. ¿Está el servidor en ejecución?');
    }
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  localStorage.removeItem('email');
};

const getToken = () => {
  return localStorage.getItem('token');
};

const getId = () => {
  return localStorage.getItem('id');
};

const getEmail = () => {
  return localStorage.getItem('email');
};

const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

export const authService = {
  login,
  logout,
  getToken,
  isAuthenticated,
  getId,
  getEmail,
}; 