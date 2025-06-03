import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropiedadCard from '../componentes/PropiedadCard';
import { obtenerFavoritos, limpiarFavoritos } from '../funciones-crud/propiedades';
import '../estilos/Favoritos.css';

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar favoritos del localStorage
    const favoritosGuardados = obtenerFavoritos();
    setFavoritos(favoritosGuardados);

    // Actualizar cuando cambie el localStorage
    const handleStorageChange = () => {
      const favoritosActualizados = obtenerFavoritos();
      setFavoritos(favoritosActualizados);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLimpiarFavoritos = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar todos los favoritos?')) {
      limpiarFavoritos();
      setFavoritos([]);
    }
  };

  return (
    <div className="favoritos-container">
      <div className="favoritos-header">
        <h1>Mis Favoritos</h1>
        {favoritos.length > 0 && (
          <button
            onClick={handleLimpiarFavoritos}
            className="btn-limpiar"
          >
            Limpiar Favoritos
          </button>
        )}
      </div>
      
      {favoritos.length === 0 ? (
        <div className="favoritos-vacio">
          <p>No tienes propiedades guardadas en favoritos</p>
          <button 
            onClick={() => navigate('/buscar')}
            className="btn-explorar"
          >
            Explorar Propiedades
          </button>
        </div>
      ) : (
        <div className="favoritos-grid">
          {favoritos.map(propiedad => (
            propiedad && propiedad.id ? (
              <div 
                key={propiedad.id}
                className="favorito-item"
                onClick={() => navigate(`/vivienda/${propiedad.id}`)}
              >
                <PropiedadCard propiedad={propiedad} />
              </div>
            ) : null
          ))}
        </div>
      )}
    </div>
  );
};

export default Favoritos; 