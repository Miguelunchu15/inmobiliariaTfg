import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { imagenesService } from '../../servicios/imagenesService';
import '../../estilos/GestionarImagenes.css';

export const GestionarImagenes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nuevaImagen, setNuevaImagen] = useState({
    imagen: null,
    descripcion: '',
    preview: null
  });

  useEffect(() => {
    cargarImagenes();
  }, [id]);

  const cargarImagenes = async () => {
    try {
      const data = await imagenesService.getImagenesByVivienda(id);
      setImagenes(data);
      setLoading(false);
    } catch (error) {
      setError('Error al cargar las imágenes');
      setLoading(false);
    }
  };

  const handleEliminar = async (imagenId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta imagen?')) {
      try {
        await imagenesService.eliminarImagen(imagenId);
        cargarImagenes();
      } catch (error) {
        setError('Error al eliminar la imagen');
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNuevaImagen(prev => ({
          ...prev,
          imagen: file,
          preview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDescripcionChange = (e) => {
    setNuevaImagen(prev => ({
      ...prev,
      descripcion: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nuevaImagen.imagen || !nuevaImagen.descripcion) {
      setError('Por favor, selecciona una imagen y añade una descripción');
      return;
    }

    try {
      await imagenesService.subirImagen(nuevaImagen.imagen, nuevaImagen.descripcion, id);
      setNuevaImagen({ imagen: null, descripcion: '', preview: null });
      cargarImagenes();
    } catch (error) {
      setError('Error al subir la imagen');
    }
  };

  const handleCancelar = () => {
    setNuevaImagen({ imagen: null, descripcion: '', preview: null });
  };

  if (loading) {
    return <div className="loading">Cargando imágenes...</div>;
  }

  return (
    <div className="gestionar-imagenes-container">
      <div className="header">
        <h1>Gestionar Imágenes</h1>
        <button className="btn-volver" onClick={() => navigate('/admin/propiedades')}>
          Volver a Propiedades
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="subir-imagen">
        <h2>Subir Nueva Imagen</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="imagen">Seleccionar Imagen</label>
            <input
              type="file"
              id="imagen"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>
          {nuevaImagen.preview && (
            <div className="preview-container">
              <img src={nuevaImagen.preview} alt="Vista previa" className="preview-image" />
              <button type="button" className="btn-cancelar" onClick={handleCancelar}>
                Cancelar
              </button>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="descripcion">Descripción</label>
            <input
              type="text"
              id="descripcion"
              value={nuevaImagen.descripcion}
              onChange={handleDescripcionChange}
              placeholder="Descripción de la imagen"
              required
            />
          </div>
          <button type="submit" className="btn-subir" disabled={!nuevaImagen.preview}>
            Subir Imagen
          </button>
        </form>
      </div>

      <div className="imagenes-grid">
        {imagenes.map((imagen) => (
          <div key={imagen.id} className="imagen-card">
            <img src={imagen.url} alt={imagen.descripcion} />
            <div className="imagen-info">
              <p>{imagen.descripcion}</p>
              <button
                className="btn-eliminar"
                onClick={() => handleEliminar(imagen.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 