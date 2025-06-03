import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toggleFavorito, esFavorito } from '../funciones-crud/propiedades';

const PropiedadCard = ({ propiedad }) => {
  // Validación inicial de la propiedad
  if (!propiedad || !propiedad.id) {
    return null;
  }

  const [isFavorito, setIsFavorito] = useState(false);
  const [imagenActual, setImagenActual] = useState(0);

  useEffect(() => {
    if (propiedad && propiedad.id) {
      setIsFavorito(esFavorito(propiedad.id));
    }
  }, [propiedad?.id]);

  const handleToggleFavorito = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (propiedad) {
      toggleFavorito(propiedad);
      setIsFavorito(prev => !prev);
    }
  };

  const cambiarImagen = (direccion) => {
    if (!propiedad.imagenes || propiedad.imagenes.length <= 1) {
      return;
    }
    
    setImagenActual((prev) => {
      return direccion === 'next' 
        ? (prev + 1) % propiedad.imagenes.length
        : prev === 0 ? propiedad.imagenes.length - 1 : prev - 1;
    });
  };

  if (!propiedad || !propiedad.imagenes || !Array.isArray(propiedad.imagenes)) {
    return null;
  }

  return (
    <div className="propiedad-card">
      <div className="propiedad-card-imagen">
        {propiedad.imagenes && propiedad.imagenes.length > 0 ? (
          <>
            <img 
              src={propiedad.imagenes[imagenActual]?.url} 
              alt={propiedad.titulo} 
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x200?text=Imagen+no+disponible';
              }}
            />
            {propiedad.imagenes.length > 1 && (
              <>
                <button 
                  className="btn-cambiar-imagen prev"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    cambiarImagen('prev');
                  }}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button 
                  className="btn-cambiar-imagen next"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    cambiarImagen('next');
                  }}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
                <div className="indicador-imagenes">
                  {imagenActual + 1} / {propiedad.imagenes.length}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="imagen-cargando">
            <div className="loader"></div>
          </div>
        )}
        <div className="propiedad-card-etiquetas">
          <span className="etiqueta">{propiedad.tipoNombre}</span>
          {propiedad.destacado === 1 && <span className="etiqueta destacado">Destacado</span>}
        </div>
        <button 
          className={`btn-favorito ${isFavorito ? 'activo' : ''}`}
          onClick={handleToggleFavorito}
          aria-label={isFavorito ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          <i className={isFavorito ? 'fas fa-heart' : 'far fa-heart'}></i>
        </button>
      </div>
      
      <Link to={`/vivienda/${propiedad.id}`} className="propiedad-card-contenido">
        <div className="propiedad-card-header">
          <h3 className="propiedad-card-titulo">{propiedad.titulo}</h3>
          <div className="propiedad-card-precio">
            {`${propiedad.precio.toLocaleString('es-ES')} €`}
          </div>
        </div>
        
        <p className="propiedad-card-ubicacion">
          <i className="fas fa-map-marker-alt"></i> {propiedad.direccion}
        </p>
        
        <div className="propiedad-card-caracteristicas">
          <div className="caracteristica">
            <i className="fas fa-ruler-combined"></i>
            <span>{propiedad.metrosCuadrados} m²</span>
          </div>
          <div className="caracteristica">
            <i className="fas fa-bed"></i>
            <span>{propiedad.habitaciones} hab.</span>
          </div>
          <div className="caracteristica">
            <i className="fas fa-bath"></i>
            <span>{propiedad.baños} baños</span>
          </div>
        </div>
        
        <div className="propiedad-card-footer">
          <div className="propiedad-card-inmobiliaria">
            <span>{propiedad.inmobiliariaNombre}</span>
          </div>
          <div className="propiedad-card-fecha">
            {new Date(propiedad.fechaPublicacion).toLocaleDateString('es-ES')}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropiedadCard; 