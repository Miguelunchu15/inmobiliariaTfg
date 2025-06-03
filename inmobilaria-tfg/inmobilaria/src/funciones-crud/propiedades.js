
export const obtenerPropiedadesDestacadas = async () => {
  try {

    const response = await fetch('http://localhost:8080/api/inmobilaria/imagenes', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    });

    if (!response.ok) {
      console.error('Error en la respuesta:', response.status, response.statusText);
      throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
    }
    
    const imagenes = await response.json();
    console.log('Datos recibidos de la API:', imagenes);
    return imagenes;
  } catch (error) {
    console.error('Error detallado:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error('No se pudo conectar con el servidor. Por favor, verifica que el servidor backend esté en ejecución.');
    }
    throw error;
  }
};


export const buscarPropiedades = async (filtros = {}, pagina = 1) => {
  try {
    const response = await fetch('http://localhost:8080/api/inmobilaria/imagenes');
    if (!response.ok) {
      throw new Error('Error al buscar propiedades');
    }
    const imagenes = await response.json();
    
    // Aplicamos filtros
    let resultados = [...imagenes];

    // Filtrado por tipo de propiedad
    if (filtros.tipo) {
      resultados = resultados.filter(p => p.vivienda.tipoNombre.toLowerCase() === filtros.tipo.toLowerCase());
    }

    // Filtrado por ubicación
    if (filtros.ubicacion) {
      resultados = resultados.filter(p => 
        p.vivienda.localidadNombre.toLowerCase().includes(filtros.ubicacion.toLowerCase()) ||
        p.vivienda.localidadProvincia.toLowerCase().includes(filtros.ubicacion.toLowerCase())
      );
    }

    // Filtrado por rango de precio
    if (filtros.precioMin) {
      resultados = resultados.filter(p => p.vivienda.precio >= parseInt(filtros.precioMin));
    }
    if (filtros.precioMax) {
      resultados = resultados.filter(p => p.vivienda.precio <= parseInt(filtros.precioMax));
    }

    // Filtrado por número de habitaciones
    if (filtros.habitacionesMin) {
      resultados = resultados.filter(p => p.vivienda.habitaciones >= parseInt(filtros.habitacionesMin));
    }

    // Filtrado por número de baños
    if (filtros.banosMin) {
      resultados = resultados.filter(p => p.vivienda.baños >= parseInt(filtros.banosMin));
    }

    // Filtrado por superficie
    if (filtros.superficieMin) {
      resultados = resultados.filter(p => p.vivienda.metrosCuadrados >= parseInt(filtros.superficieMin));
    }
    if (filtros.superficieMax) {
      resultados = resultados.filter(p => p.vivienda.metrosCuadrados <= parseInt(filtros.superficieMax));
    }

    // Paginación
    const total = resultados.length;
    const porPagina = 10;
    const inicio = (pagina - 1) * porPagina;
    const propiedadesPaginadas = resultados.slice(inicio, inicio + porPagina);

    return {
      propiedades: propiedadesPaginadas,
      total
    };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


export const obtenerDetallePropiedad = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/inmobilaria/imagenes/${id}`);
    if (!response.ok) {
      throw new Error('Propiedad no encontrada');
    }
    const imagen = await response.json();
    return imagen;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


export const toggleFavorito = (vivienda) => {
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  const index = favoritos.findIndex(fav => fav.id === vivienda.id);
  
  if (index >= 0) {
    // Si ya existe, lo quitamos
    favoritos.splice(index, 1);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    return false;
  } else {
    // Si no existe, lo añadimos
    favoritos.push(vivienda);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    return true;
  }
};


export const esFavorito = (id) => {
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  return favoritos.some(fav => fav.id === id);
};

/**
 * Obtiene todas las viviendas guardadas en favoritos
 * @returns {Array} Array de viviendas favoritas
 */
export const obtenerFavoritos = () => {
  return JSON.parse(localStorage.getItem('favoritos')) || [];
};

/**
 * Limpia todos los favoritos del localStorage
 */
export const limpiarFavoritos = () => {
  localStorage.removeItem('favoritos');
  window.dispatchEvent(new Event('storage'));
}; 