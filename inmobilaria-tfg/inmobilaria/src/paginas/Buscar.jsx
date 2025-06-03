import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BuscadorViviendas from '../componentes/BuscadorViviendas';
import PropiedadCard from '../componentes/PropiedadCard';
import '../estilos/Buscar.css';

const Buscar = () => {
  const [searchParams] = useSearchParams();
  const [todasLasPropiedades, setTodasLasPropiedades] = useState([]);
  const [propiedadesFiltradas, setPropiedadesFiltradas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Función para transformar los datos y eliminar duplicados
  const transformarDatos = (data) => {
    // Usar un Map para mantener solo una entrada por ID de vivienda
    const propiedadesMap = new Map();

    data.forEach(item => {
      // Validar que item y vivienda existan
      if (!item || !item.vivienda) {
        return; // Saltar este item si no es válido
      }

      const viviendaId = item.vivienda.id;
      if (!viviendaId) {
        return; // Saltar si no hay ID de vivienda
      }

      if (!propiedadesMap.has(viviendaId)) {
        // Crear nuevo objeto de propiedad
        propiedadesMap.set(viviendaId, {
          id: item.vivienda.id,
          titulo: item.vivienda.titulo || '',
          descripcion: item.vivienda.descripcion || '',
          precio: item.vivienda.precio || 0,
          habitaciones: item.vivienda.habitaciones || 0,
          baños: item.vivienda.baños || 0,
          metrosCuadrados: item.vivienda.metrosCuadrados || 0,
          direccion: item.vivienda.direccion || '',
          disponible: item.vivienda.disponible || false,
          fechaPublicacion: item.vivienda.fechaPublicacion || new Date().toISOString(),
          tipoId: item.vivienda.tipo?.id,
          tipoNombre: item.vivienda.tipo?.nombre || '',
          localidad: item.vivienda.localidad?.nombre || '',
          provincia: item.vivienda.localidad?.provincia || '',
          inmobiliaria: {
            id: item.vivienda.inmobiliaria?.id || 0,
            nombre: item.vivienda.inmobiliaria?.nombre || '',
            telefono: item.vivienda.inmobiliaria?.telefono || '',
            email: item.vivienda.inmobiliaria?.emailContacto || ''
          },
          destacado: item.vivienda.destacado === 1,
          garaje: item.vivienda.garaje === 1,
          imagenes: [{
            url: item.url || '',
            descripcion: item.descripcion || ''
          }]
        });
      } else {
        // Si ya existe la vivienda, añadir la imagen al array de imágenes
        const propiedad = propiedadesMap.get(viviendaId);
        if (item.url) {
          propiedad.imagenes.push({
            url: item.url,
            descripcion: item.descripcion || ''
          });
        }
      }
    });

    return Array.from(propiedadesMap.values());
  };

  // Cargar todas las propiedades al montar el componente
  useEffect(() => {
    const cargarTodasLasPropiedades = async () => {
      try {
        setCargando(true);
        setError(null);

        const response = await fetch('http://localhost:8080/api/inmobilaria/viviendas/filtros');
        
        if (!response.ok) {
          throw new Error('Error al cargar las propiedades');
        }

        const data = await response.json();
        const propiedadesTransformadas = transformarDatos(data);
        
        setTodasLasPropiedades(propiedadesTransformadas);
        setPropiedadesFiltradas(propiedadesTransformadas);
      } catch (error) {
        console.error('Error al cargar propiedades:', error);
        setError(error.message);
      } finally {
        setCargando(false);
      }
    };

    cargarTodasLasPropiedades();
  }, []);

  // Filtrar propiedades cuando cambien los parámetros de búsqueda
  useEffect(() => {
    const aplicarFiltros = async () => {
      try {
        setCargando(true);
        const habitaciones = searchParams.get('habitaciones');
        const tipoId = searchParams.get('tipoId');
        const garaje = searchParams.get('garaje');
        const precioMin = searchParams.get('precioMin');
        const precioMax = searchParams.get('precioMax');
        const localidadId = searchParams.get('localidadId');
        const estadoId = searchParams.get('estadoId');

        // Construir la URL con los parámetros de filtro
        let url = 'http://localhost:8080/api/inmobilaria/viviendas/filtros?';
        const params = new URLSearchParams();
        
        if (habitaciones) params.append('habitaciones', habitaciones);
        if (tipoId) params.append('tipoId', tipoId);
        if (garaje) params.append('garaje', garaje);
        if (precioMin) params.append('precioMin', precioMin);
        if (precioMax) params.append('precioMax', precioMax);
        if (localidadId) params.append('localidadId', localidadId);
        if (estadoId) params.append('estadoId', estadoId);

        url += params.toString();

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Error al aplicar filtros');
        }

        const data = await response.json();
        const propiedadesFiltradas = transformarDatos(data);
        
        setPropiedadesFiltradas(propiedadesFiltradas);
      } catch (error) {
        console.error('Error al aplicar filtros:', error);
        setError(error.message);
      } finally {
        setCargando(false);
      }
    };

    aplicarFiltros();
  }, [searchParams]);

  return (
    <div className="buscar-pagina">
      <section className="seccion-buscador">
        <h1 className="seccion-titulo">Buscar Viviendas</h1>
        <BuscadorViviendas />
      </section>

      <section className="seccion-resultados">
        {error ? (
          <div className="error-contenedor">
            <p className="error-mensaje">Error: {error}</p>
          </div>
        ) : cargando ? (
          <div className="cargando-contenedor">
            <div className="loader"></div>
            <p>Cargando propiedades...</p>
          </div>
        ) : propiedadesFiltradas.length === 0 ? (
          <div className="sin-resultados">
            <p>No se encontraron propiedades que coincidan con los criterios de búsqueda.</p>
          </div>
        ) : (
          <>
            <div className="resultados-header">
              <h2>Resultados de la búsqueda</h2>
              <p>{propiedadesFiltradas.length} propiedades encontradas</p>
            </div>
            <div className="propiedades-grid">
              {propiedadesFiltradas.map(propiedad => (
                <PropiedadCard key={propiedad.id} propiedad={propiedad} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Buscar; 