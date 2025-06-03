import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropiedadCard from '../componentes/PropiedadCard';
import { obtenerFavoritos } from '../funciones-crud/propiedades';
import '../estilos/CompararViviendas.css';

const CompararViviendas = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);
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

  const toggleSeleccion = (propiedad) => {
    if (seleccionadas.find(p => p.id === propiedad.id)) {
      setSeleccionadas(seleccionadas.filter(p => p.id !== propiedad.id));
    } else if (seleccionadas.length < 2) {
      setSeleccionadas([...seleccionadas, propiedad]);
    }
  };

  const irADetalles = (id) => {
    navigate(`/vivienda/${id}`);
  };

  return (
    <div className="comparar-container">
      <div className="comparar-header">
        <h1>Comparar Viviendas</h1>
      </div>
      
      <div className="seleccion-favoritos">
        <h3>Selecciona hasta dos viviendas para comparar:</h3>
        <div className="favoritos-grid">
          {favoritos.map(propiedad => (
            <div 
              key={propiedad.id}
              className={`favorito-card ${seleccionadas.find(p => p.id === propiedad.id) ? 'seleccionada' : ''}`}
              onClick={() => toggleSeleccion(propiedad)}
            >
              <PropiedadCard propiedad={propiedad} />
            </div>
          ))}
        </div>
      </div>

      {seleccionadas.length === 2 && (
        <div className="comparacion-container">
          <h3>Comparación de Viviendas</h3>
          <div className="comparacion-grid">
            {seleccionadas.map(propiedad => (
              <div 
                key={propiedad.id} 
                className="comparacion-card"
                onClick={() => irADetalles(propiedad.id)}
              >
                <img src={propiedad.imagen} alt={propiedad.titulo} />
                <h4>{propiedad.titulo}</h4>
                <div className="detalles-comparacion">
                  <p><strong>Precio:</strong> {propiedad.precio}€</p>
                  <p><strong>Ubicación:</strong> {propiedad.direccion}</p>
                  <p><strong>m²:</strong> {propiedad.metrosCuadrados}</p>
                  <p><strong>Habitaciones:</strong> {propiedad.habitaciones}</p>
                  <p><strong>Baños:</strong> {propiedad.baños}</p>
                  <p><strong>Tipo:</strong> {propiedad.tipoNombre}</p>
                  <p><strong>Estado:</strong> {propiedad.estado}</p>
                  {propiedad.garaje && <p><strong>Garaje:</strong> Sí</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {favoritos.length === 0 && (
        <div className="no-favoritos">
          <p>No tienes viviendas en favoritos. Añade algunas para poder compararlas.</p>
          <button 
            onClick={() => navigate('/buscar')}
            className="btn-explorar"
          >
            Explorar Propiedades
          </button>
        </div>
      )}
    </div>
  );
};

export default CompararViviendas; 