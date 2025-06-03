import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toggleFavorito } from '../funciones-crud/propiedades';
import '../estilos/DetalleVivienda.css';

const DetalleVivienda = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vivienda, setVivienda] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [imagenActual, setImagenActual] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorito, setIsFavorito] = useState(false);

  useEffect(() => {
    const cargarVivienda = async () => {
      try {
        setCargando(true);
        setError(null);

        // Cargar datos de la vivienda
        const responseVivienda = await fetch(`http://localhost:8080/api/inmobilaria/viviendas/${id}`);
        if (!responseVivienda.ok) {
          throw new Error('Error al cargar los datos de la vivienda');
        }
        const dataVivienda = await responseVivienda.json();
        setVivienda(dataVivienda);

        // Cargar imágenes de la vivienda
        const responseImagenes = await fetch(`http://localhost:8080/api/inmobilaria/imagenes/${id}`);
        if (!responseImagenes.ok) {
          throw new Error('Error al cargar las imágenes');
        }
        const dataImagenes = await responseImagenes.json();
        setImagenes(dataImagenes);
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      } finally {
        setCargando(false);
      }
    };

    cargarVivienda();
  }, [id]);

  const handleToggleFavorito = async () => {
    try {
      await toggleFavorito(id, !isFavorito);
      setIsFavorito(!isFavorito);
    } catch (error) {
      console.error('Error al actualizar favoritos:', error);
    }
  };

  const handleVolver = () => {
    navigate(-1);
  };

  const cambiarImagen = (direccion) => {
    if (direccion === 'next') {
      setImagenActual((prev) => (prev + 1) % imagenes.length);
    } else {
      setImagenActual((prev) => (prev - 1 + imagenes.length) % imagenes.length);
    }
  };

  if (cargando) {
    return (
      <div className="detalle-cargando">
        <div className="loader"></div>
        <p>Cargando detalles de la vivienda...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detalle-error">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!vivienda) {
    return (
      <div className="detalle-error">
        <p>No se encontró la vivienda</p>
      </div>
    );
  }

  return (
    <div className="detalle-vivienda">
      <div className="detalle-header">
        <div className="detalle-header-acciones">
          <button className="btn-volver" onClick={handleVolver}>
            <i className="fas fa-arrow-left"></i>
            Volver
          </button>
          <button 
            className={`btn-favorito ${isFavorito ? 'activo' : ''}`}
            onClick={handleToggleFavorito}
            aria-label={isFavorito ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          >
            <i className={isFavorito ? 'fas fa-heart' : 'far fa-heart'}></i>
            {isFavorito ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          </button>
        </div>
        <h1 className="detalle-titulo">{vivienda.titulo}</h1>
        <div className="detalle-precio">
          {vivienda.precio.toLocaleString('es-ES')} €
        </div>
      </div>

      <div className="detalle-galeria">
        {imagenes.length > 0 ? (
          <div className="galeria-container">
            <img
              src={imagenes[imagenActual].url}
              alt={imagenes[imagenActual].descripcion}
              className="galeria-imagen-principal"
            />
            {imagenes.length > 1 && (
              <>
                <button
                  className="galeria-btn prev"
                  onClick={() => cambiarImagen('prev')}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button
                  className="galeria-btn next"
                  onClick={() => cambiarImagen('next')}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
                <div className="galeria-miniaturas">
                  {imagenes.map((imagen, index) => (
                    <img
                      key={imagen.id}
                      src={imagen.url}
                      alt={imagen.descripcion}
                      className={`miniatura ${index === imagenActual ? 'activa' : ''}`}
                      onClick={() => setImagenActual(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="galeria-sin-imagenes">
            <i className="fas fa-image"></i>
            <p>No hay imágenes disponibles</p>
          </div>
        )}
      </div>

      <div className="detalle-info">
        <div className="info-principal">
          <div className="info-caracteristicas">
            <div className="caracteristica">
              <i className="fas fa-ruler-combined"></i>
              <span>{vivienda.metrosCuadrados} m²</span>
            </div>
            <div className="caracteristica">
              <i className="fas fa-bed"></i>
              <span>{vivienda.habitaciones} hab.</span>
            </div>
            <div className="caracteristica">
              <i className="fas fa-bath"></i>
              <span>{vivienda.baños} baños</span>
            </div>
            {vivienda.garaje === 1 && (
              <div className="caracteristica">
                <i className="fas fa-car"></i>
                <span>Garaje</span>
              </div>
            )}
          </div>

          <div className="info-ubicacion">
            <h3>Ubicación</h3>
            <p>
              <i className="fas fa-map-marker-alt"></i>
              {vivienda.direccion}
            </p>
            <p>
              <i className="fas fa-city"></i>
              {vivienda.localidad.nombre}, {vivienda.localidad.provincia}
            </p>
          </div>

          <div className="info-descripcion">
            <h3>Descripción</h3>
            <p>{vivienda.descripcion}</p>
          </div>
        </div>

        <div className="info-inmobiliaria">
          <h3>Información de contacto</h3>
          <div className="inmobiliaria-card">
            <h4>{vivienda.inmobiliaria.nombre}</h4>
            <p>{vivienda.inmobiliaria.descripcion}</p>
            <div className="inmobiliaria-contacto">
              <p>
                <i className="fas fa-phone"></i>
                {vivienda.inmobiliaria.telefono}
              </p>
              <p>
                <i className="fas fa-envelope"></i>
                {vivienda.inmobiliaria.emailContacto}
              </p>
              <p>
                <i className="fas fa-map-marker-alt"></i>
                {vivienda.inmobiliaria.direccion}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleVivienda; 