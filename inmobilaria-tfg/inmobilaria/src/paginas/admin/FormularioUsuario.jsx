import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usuariosService } from '../../servicios/usuariosService';
import '../../estilos/FormularioUsuario.css';

export const FormularioUsuario = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    contraseña: '',
    repetirContraseña: '',
    rol: {
      id: ''
    }
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const rolesData = await usuariosService.getRoles();
        setRoles(rolesData);

        if (id) {
          const usuarioData = await usuariosService.getUsuarioById(id);
          setFormData({
            nombre: usuarioData.nombre,
            email: usuarioData.email,
            contraseña: '',
            repetirContraseña: '',
            rol: {
              id: usuarioData.rol.id
            }
          });
        }
        setLoading(false);
      } catch (error) {
        setError('Error al cargar los datos');
        setLoading(false);
      }
    };

    cargarDatos();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'rol') {
      setFormData(prev => ({
        ...prev,
        rol: {
          id: parseInt(value)
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validarFormulario = () => {
    if (!formData.nombre || !formData.email || !formData.rol.id) {
      setError('Todos los campos son obligatorios');
      return false;
    }

    if (!id && (!formData.contraseña || !formData.repetirContraseña)) {
      setError('La contraseña es obligatoria al crear un usuario');
      return false;
    }

    if (formData.contraseña && formData.contraseña !== formData.repetirContraseña) {
      setError('Las contraseñas no coinciden');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validarFormulario()) {
      return;
    }

    try {
      const usuarioData = {
        nombre: formData.nombre,
        email: formData.email,
        rol: formData.rol
      };

      // Solo incluir contraseña si se ha proporcionado una nueva
      if (formData.contraseña) {
        usuarioData.contraseña = formData.contraseña;
      }

      if (id) {
        await usuariosService.actualizarUsuario(id, usuarioData);
      } else {
        await usuariosService.crearUsuario(usuarioData);
      }
      navigate('/admin/usuarios');
    } catch (error) {
      setError('Error al guardar el usuario');
    }
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="formulario-container">
      <div className="header">
        <h1>{id ? 'Editar Usuario' : 'Crear Usuario'}</h1>
        <button className="btn-volver" onClick={() => navigate('/admin/usuarios')}>
          Volver
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit} className="formulario">
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contraseña">Contraseña:</label>
          <input
            type="password"
            id="contraseña"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            required={!id}
          />
          <small>Dejar en blanco para mantener la contraseña actual</small>
        </div>

        <div className="form-group">
          <label htmlFor="repetirContraseña">Repetir Contraseña:</label>
          <input
            type="password"
            id="repetirContraseña"
            name="repetirContraseña"
            value={formData.repetirContraseña}
            onChange={handleChange}
            required={!id || formData.contraseña !== ''}
          />
        </div>

        <div className="form-group">
          <label htmlFor="rol">Rol:</label>
          <select
            id="rol"
            name="rol"
            value={formData.rol.id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un rol</option>
            {roles.map(rol => (
              <option key={rol.id} value={rol.id}>
                {rol.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-guardar">
            {id ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  );
}; 