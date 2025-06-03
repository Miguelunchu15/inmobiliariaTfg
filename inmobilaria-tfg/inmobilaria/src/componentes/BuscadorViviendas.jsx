import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/BuscadorViviendas.css';

const BuscadorViviendas = () => {
  const navigate = useNavigate();
  const [filtros, setFiltros] = useState({
    habitaciones: '',
    tipoId: '',
    garaje: false,
    precioMin: '',
    precioMax: '',
    localidadId: '',
    estadoId: ''
  });

  const [localidades, setLocalidades] = useState([]);
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    const cargarLocalidades = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/inmobilaria/localidades');
        if (!response.ok) {
          throw new Error('Error al cargar las localidades');
        }
        const data = await response.json();
        setLocalidades(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const cargarEstados = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/inmobilaria/estados');
        if (!response.ok) {
          throw new Error('Error al cargar los estados');
        }
        const data = await response.json();
        setEstados(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    cargarLocalidades();
    cargarEstados();
  }, []);

  const tiposVivienda = [
    { id: 1, nombre: 'Piso' },
    { id: 2, nombre: 'Chalet' },
    { id: 3, nombre: 'Adosado' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    
    // Solo añadimos los parámetros que tienen valor
    if (filtros.habitaciones) queryParams.append('habitaciones', filtros.habitaciones);
    if (filtros.tipoId) queryParams.append('tipoId', filtros.tipoId);
    if (filtros.garaje) queryParams.append('garaje', filtros.garaje);
    if (filtros.precioMin) queryParams.append('precioMin', filtros.precioMin);
    if (filtros.precioMax) queryParams.append('precioMax', filtros.precioMax);
    if (filtros.localidadId) queryParams.append('localidadId', filtros.localidadId);
    if (filtros.estadoId) queryParams.append('estadoId', filtros.estadoId);

    navigate(`/buscar?${queryParams.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="buscador-viviendas">
      <div className="filtros-grid">
        <div className="filtro-grupo">
          <label htmlFor="estadoId">Estado</label>
          <select
            id="estadoId"
            name="estadoId"
            value={filtros.estadoId}
            onChange={handleChange}
            className="filtro-select"
          >
            <option value="">Todos</option>
            {estados.map(estado => (
              <option key={estado.id} value={estado.id}>
                {estado.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="filtro-grupo">
          <label htmlFor="localidadId">Localidad</label>
          <select
            id="localidadId"
            name="localidadId"
            value={filtros.localidadId}
            onChange={handleChange}
            className="localidad-select"
          >
            <option value="">Todas</option>
            {localidades.map(localidad => (
              <option key={localidad.id} value={localidad.id}>
                {localidad.nombre} ({localidad.provincia})
              </option>
            ))}
          </select>
        </div>

        <div className="filtro-grupo">
          <label htmlFor="habitaciones">Habitaciones</label>
          <input
            type="number"
            id="habitaciones"
            name="habitaciones"
            min="0"
            value={filtros.habitaciones}
            onChange={handleChange}
            className="filtro-input"
          />
        </div>

        <div className="filtro-grupo">
          <label htmlFor="tipoId">Tipo de Vivienda</label>
          <select
            id="tipoId"
            name="tipoId"
            value={filtros.tipoId}
            onChange={handleChange}
            className="filtro-select"
          >
            <option value="">Todos</option>
            {tiposVivienda.map(tipo => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="filtro-grupo">
          <label htmlFor="garaje">Garaje</label>
          <input
            type="checkbox"
            id="garaje"
            name="garaje"
            checked={filtros.garaje}
            onChange={handleChange}
            className="filtro-checkbox"
          />
        </div>

        <div className="filtro-grupo rango-precio">
          <label>Rango de Precio</label>
          <div className="rango-inputs">
            <input
              type="number"
              name="precioMin"
              value={filtros.precioMin}
              onChange={handleChange}
              placeholder="Mínimo"
              className="filtro-input"
            />
            <span>-</span>
            <input
              type="number"
              name="precioMax"
              value={filtros.precioMax}
              onChange={handleChange}
              placeholder="Máximo"
              className="filtro-input"
            />
          </div>
        </div>

        <div className="filtro-grupo">
          <button type="submit" className="btn btn-primary">
            Buscar
          </button>
        </div>
      </div>
    </form>
  );
};

export default BuscadorViviendas; 