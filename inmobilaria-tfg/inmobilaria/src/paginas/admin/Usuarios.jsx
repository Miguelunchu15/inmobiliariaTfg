import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usuariosService } from '../../servicios/usuariosService';
import '../../estilos/Usuarios.css';

export const Usuarios = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const data = await usuariosService.getUsuarios();
      setUsuarios(data);
      setLoading(false);
    } catch (error) {
      setError('Error al cargar los usuarios');
      setLoading(false);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        await usuariosService.eliminarUsuario(id);
        cargarUsuarios();
      } catch (error) {
        setError('Error al eliminar el usuario');
      }
    }
  };

  const handleEditar = (id) => {
    navigate(`/admin/usuarios/editar/${id}`);
  };

  if (loading) {
    return <div className="loading">Cargando usuarios...</div>;
  }

  return (
    <div className="usuarios-container">
      <div className="header">
        <h1>Gestión de Usuarios</h1>
        <div className="header-buttons">
          <button className="btn-volver" onClick={() => navigate('/admin/menu')}>
            Volver al Menú
          </button>
          <button className="btn-añadir" onClick={() => navigate('/admin/usuarios/crear')}>
            Añadir Usuario
          </button>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="tabla-container">
        <table className="tabla-usuarios">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Fecha de Creación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>{usuario.rol.nombre}</td>
                <td>{new Date(usuario.fechaCreacion).toLocaleDateString()}</td>
                <td className="acciones">
                  <button
                    className="btn-editar"
                    onClick={() => handleEditar(usuario.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-eliminar"
                    onClick={() => handleEliminar(usuario.id)}
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