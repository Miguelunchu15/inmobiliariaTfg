import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { inmobiliariasService } from '../../servicios/inmobiliariasService';
import '../../estilos/Inmobiliarias.css';

export const Inmobiliarias = () => {
  const navigate = useNavigate();
  const [inmobiliarias, setInmobiliarias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarInmobiliarias();
  }, []);

  const cargarInmobiliarias = async () => {
    try {
      const data = await inmobiliariasService.getInmobiliarias();
      setInmobiliarias(data);
      setLoading(false);
    } catch (error) {
      setError('Error al cargar las inmobiliarias');
      setLoading(false);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta inmobiliaria?')) {
      try {
        await inmobiliariasService.eliminarInmobiliaria(id);
        cargarInmobiliarias();
      } catch (error) {
        setError('Error al eliminar la inmobiliaria');
      }
    }
  };

  const handleEditar = (id) => {
    navigate(`/admin/inmobiliarias/editar/${id}`);
  };

  if (loading) {
    return <div className="loading">Cargando inmobiliarias...</div>;
  }

  return (
    <div className="inmobiliarias-container">
      <div className="header">
        <h1>Gestión de Inmobiliarias</h1>
        <div className="header-buttons">
          <button className="btn-volver" onClick={() => navigate('/admin/menu')}>
            Volver al Menú
          </button>
          <button className="btn-añadir" onClick={() => navigate('/admin/inmobiliarias/crear')}>
            Añadir Inmobiliaria
          </button>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="tabla-container">
        <table className="tabla-inmobiliarias">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {inmobiliarias.map((inmobiliaria) => (
              <tr key={inmobiliaria.id}>
                <td>{inmobiliaria.id}</td>
                <td>{inmobiliaria.nombre}</td>
                <td>{inmobiliaria.descripcion}</td>
                <td>{inmobiliaria.telefono}</td>
                <td>{inmobiliaria.direccion}</td>
                <td>{inmobiliaria.emailContacto}</td>
                <td className="acciones">
                  <button
                    className="btn-editar"
                    onClick={() => handleEditar(inmobiliaria.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-eliminar"
                    onClick={() => handleEliminar(inmobiliaria.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 