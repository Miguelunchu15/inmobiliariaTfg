import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { viviendasService } from '../../servicios/viviendasService';
import { catalogosService } from '../../servicios/catalogosService';
import '../../estilos/CrearVivienda.css';

export const CrearVivienda = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const [tipos, setTipos] = useState([]);
  const [estados, setEstados] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    precio: '',
    habitaciones: '',
    baños: '',
    metrosCuadrados: '',
    direccion: '',
    disponible: true,
    fechaPublicacion: new Date().toISOString(),
    tipo: { id: '' },
    localidad: { id: '' },
    inmobiliaria: { id: localStorage.getItem('inmobiliariaId') },
    destacado: 0,
    garaje: 0,
    estado: { id: '' }
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [tiposData, estadosData, localidadesData] = await Promise.all([
          catalogosService.getTipos(),
          catalogosService.getEstados(),
          catalogosService.getLocalidades()
        ]);

        setTipos(tiposData);
        setEstados(estadosData);
        setLocalidades(localidadesData);

        if (isEditing) {
          const viviendaData = await viviendasService.getViviendaById(id);
          setFormData({
            ...viviendaData,
            inmobiliaria: { id: localStorage.getItem('inmobiliariaId') }
          });
        }

        setLoading(false);
      } catch (error) {
        setError('Error al cargar los datos necesarios');
        setLoading(false);
      }
    };

    cargarDatos();
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'tipo' || name === 'estado' || name === 'localidad') {
      setFormData(prev => ({
        ...prev,
        [name]: { id: value }
      }));
    } else if (name === 'garaje') {
      setFormData(prev => ({
        ...prev,
        [name]: checked ? 1 : 0
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
      if (isEditing) {
        await viviendasService.actualizarVivienda(id, formData);
      } else {
        await viviendasService.crearVivienda(formData);
      }
      navigate('/admin/propiedades');
    } catch (error) {
      setError(isEditing ? 'Error al actualizar la vivienda' : 'Error al crear la vivienda');
    }
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="crear-vivienda-container">
      <h1>{isEditing ? 'Editar Vivienda' : 'Crear Nueva Vivienda'}</h1>
      <form onSubmit={handleSubmit} className="crear-vivienda-form">
        <div className="form-group full-width">
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group full-width">
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
          <label htmlFor="precio">Precio</label>
          <input
            type="number"
            id="precio"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="habitaciones">Habitaciones</label>
          <input
            type="number"
            id="habitaciones"
            name="habitaciones"
            value={formData.habitaciones}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="baños">Baños</label>
          <input
            type="number"
            id="baños"
            name="baños"
            value={formData.baños}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="metrosCuadrados">Metros Cuadrados</label>
          <input
            type="number"
            id="metrosCuadrados"
            name="metrosCuadrados"
            value={formData.metrosCuadrados}
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
          <label htmlFor="tipo">Tipo de Vivienda</label>
          <select
            id="tipo"
            name="tipo"
            value={formData.tipo.id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un tipo</option>
            {tipos.map(tipo => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="estado">Estado</label>
          <select
            id="estado"
            name="estado"
            value={formData.estado.id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un estado</option>
            {estados.map(estado => (
              <option key={estado.id} value={estado.id}>
                {estado.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="localidad">Localidad</label>
          <select
            id="localidad"
            name="localidad"
            value={formData.localidad.id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una localidad</option>
            {localidades.map(localidad => (
              <option key={localidad.id} value={localidad.id}>
                {localidad.nombre}, {localidad.provincia}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="garaje"
              checked={formData.garaje === 1}
              onChange={handleChange}
            />
            Garaje
          </label>
        </div>

        <div className="form-buttons">
          <button type="button" onClick={() => navigate('/admin/propiedades')} className="btn-cancelar">
            Cancelar
          </button>
          <button type="submit" className="btn-guardar">
            {isEditing ? 'Actualizar Vivienda' : 'Crear Vivienda'}
          </button>
        </div>
      </form>
    </div>
  );
}; 