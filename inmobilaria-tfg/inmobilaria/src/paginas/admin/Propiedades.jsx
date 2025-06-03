import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { viviendasService } from '../../servicios/viviendasService';
import '../../estilos/Propiedades.css';

export const Propiedades = () => {
  const [viviendas, setViviendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const inmobiliariaId = localStorage.getItem('inmobiliariaId');

  useEffect(() => {
    cargarViviendas();
  }, []);

  const cargarViviendas = async () => {
    try {
      const data = await viviendasService.getViviendasByInmobiliaria(inmobiliariaId);
      setViviendas(data);
      setLoading(false);
    } catch (error) {
      setError('Error al cargar las viviendas');
      setLoading(false);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta vivienda?')) {
      try {
        await viviendasService.eliminarVivienda(id);
        cargarViviendas(); // Recargar la lista después de eliminar
      } catch (error) {
        setError('Error al eliminar la vivienda');
      }
    }
  };

  if (loading) {
    return <div className="loading-message">Cargando viviendas...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="propiedades-container">
      <div className="header">
        <h1>Gestión de Propiedades</h1>
        <div className="header-buttons">
          <button className="btn-volver" onClick={() => navigate('/admin/menu')}>
            Volver al Menú
          </button>
          <button className="btn-añadir" onClick={() => navigate('/admin/propiedades/crear')}>
            Añadir Propiedad
          </button>
        </div>
      </div>

      <div className="propiedades-header">
        <h1>Listado de Viviendas</h1>
      </div>

      <div className="table-container">
        <table className="propiedades-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Precio</th>
              <th>Tipo</th>
              <th>Localidad</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {viviendas.map((vivienda) => (
              <tr key={vivienda.id}>
                <td>{vivienda.id}</td>
                <td>{vivienda.titulo}</td>
                <td>{vivienda.precio}€</td>
                <td>{vivienda.tipo.nombre}</td>
                <td>{vivienda.localidad.nombre}</td>
                <td>{vivienda.estado.nombre}</td>
                <td>
                  <div className="acciones">
                    <Link to={`/admin/propiedades/crear/${vivienda.id}`} className="btn-editar">
                      Editar
                    </Link>
                    <Link to={`/admin/propiedades/imagenes/${vivienda.id}`} className="btn-imagenes">
                      Editar Imágenes
                    </Link>
                    <button
                      onClick={() => handleEliminar(vivienda.id)}
                      className="btn-eliminar"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 