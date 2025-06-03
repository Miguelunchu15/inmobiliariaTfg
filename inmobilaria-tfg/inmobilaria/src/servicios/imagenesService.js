const getImagenesByVivienda = async (viviendaId) => {
  try {
    const response = await fetch(`http://localhost:8080/api/inmobilaria/imagenes/${viviendaId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener las imágenes');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

const eliminarImagen = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/inmobilaria/imagenes/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Error al eliminar la imagen');
    }
  } catch (error) {
    throw error;
  }
};

const subirImagen = async (imagen, descripcion, id_vivienda) => {
  try {
    const formData = new FormData();
    formData.append('imagen', imagen);
    formData.append('descripcion', descripcion);
    formData.append('id_vivienda', id_vivienda);

    const response = await fetch('http://localhost:8080/api/inmobilaria/imagenes', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Error al subir la imagen');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const imagenesService = {
  getImagenesByVivienda,
  eliminarImagen,
  subirImagen
}; 