import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { inmobiliariasService } from '../../servicios/inmobiliariasService';
import { usuariosService } from '../../servicios/usuariosService';
import '../../estilos/FormularioInmobiliaria.css';

export const FormularioInmobiliaria = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    telefono: '',
    direccion: '',
    emailContacto: '',
    usuario: {
      id: ''
    }
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const usuariosData = await usuariosService.getUsuarios();
        setUsuarios(usuariosData);

        if (id) {
          const inmobiliariaData = await inmobiliariasService.getInmobiliariaById(id);
          setFormData({
            ...inmobiliariaData,
            usuario: {
              id: inmobiliariaData.usuario.id
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
    if (name === 'usuarioId') {
      setFormData(prev => ({
        ...prev,
        usuario: {
          id: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await inmobiliariasService.actualizarInmobiliaria(id, formData);
      } else {
        await inmobiliariasService.crearInmobiliaria(formData);
      }
      navigate('/admin/inmobiliarias');
    } catch (error) {
      setError('Error al guardar la inmobiliaria');
    }
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="formulario-container">
      <div className="header">
        <h1>{id ? 'Editar Inmobiliaria' : 'Crear Inmobiliaria'}</h1>
        <button className="btn-volver" onClick={() => navigate('/admin/inmobiliarias')}>
          Volver
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit} className="formulario">
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
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
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="direccion">Dirección</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="emailContacto">Email de Contacto</label>
          <input
            type="email"
            id="emailContacto"
            name="emailContacto"
            value={formData.emailContacto}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="usuarioId">Usuario</label>
          <select
            id="usuarioId"
            name="usuarioId"
            value={formData.usuario.id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un usuario</option>
            {usuarios.map(usuario => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.email}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-guardar">
          {id ? 'Actualizar' : 'Crear'} Inmobiliaria
        </button>
      </form>
    </div>
  );
}; 