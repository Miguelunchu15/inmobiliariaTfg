import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropiedadCard from '../componentes/PropiedadCard';
import { obtenerPropiedadesDestacadas } from '../funciones-crud/propiedades';

const Inicio = () => {
  const [propiedadesDestacadas, setPropiedadesDestacadas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarPropiedadesDestacadas = async () => {
      try {
        setCargando(true);
        setError(null);
        
        const imagenes = await obtenerPropiedadesDestacadas();
        
        if (!Array.isArray(imagenes)) {
          throw new Error('Formato de datos inválido');
        }
        
        const propiedadesUnicas = imagenes.reduce((acc, imagen) => {
          if (!imagen.vivienda) {
            return acc;
          }
          
          const viviendaId = imagen.vivienda.id;
          if (!acc[viviendaId]) {
            acc[viviendaId] = {
              ...imagen.vivienda,
              imagenes: [{
                id: imagen.id,
                url: imagen.url,
                descripcion: imagen.descripcion
              }]
            };
          } else {
            acc[viviendaId].imagenes.push({
              id: imagen.id,
              url: imagen.url,
              descripcion: imagen.descripcion
            });
          }
          return acc;
        }, {});
        
        const propiedadesArray = Object.values(propiedadesUnicas);
        setPropiedadesDestacadas(propiedadesArray);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    };

    cargarPropiedadesDestacadas();
  }, []);

  return (
    <div className="inicio-pagina">
      {/* Hero Banner - Ancho completo */}
      <section className="hero-banner">
        <div className="hero-content">
          <h1 className="hero-titulo">Encuentra tu hogar ideal</h1>
          <p className="hero-subtitulo">
            Miles de propiedades te están esperando en toda España
          </p>
          <div className="hero-opciones">
            <Link to="/buscar?estadoId=1" className="hero-opcion">
              <i className="fas fa-home"></i>
              <span>Comprar</span>
            </Link>
            <Link to="/buscar?estadoId=2" className="hero-opcion">
              <i className="fas fa-key"></i>
              <span>Alquilar</span>
            </Link>
            <Link to="/comparar" className="hero-opcion">
              <i className="fas fa-balance-scale"></i>
              <span>Comparar</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="seccion">
        <div className="seccion-header">
          <h2 className="seccion-titulo">Propiedades destacadas</h2>
          <Link to="/buscar?destacado=true" className="btn-link">Ver todas</Link>
        </div>
        {error ? (
          <div className="error-contenedor">
            <p className="error-mensaje">Error: {error}</p>
          </div>
        ) : cargando ? (
          <div className="cargando-contenedor">
            <div className="loader"></div>
            <p>Cargando propiedades destacadas...</p>
          </div>
        ) : (
          <div className="propiedades-grid">
            {propiedadesDestacadas.map(propiedad => {
              return <PropiedadCard key={propiedad.id} propiedad={propiedad} />;
            })}
          </div>
        )}
      </section>

      <section className="seccion">
        <h2 className="seccion-titulo">Explora por tipo de propiedad</h2>
        
        <div className="categorias-grid">
          <Link to="/buscar?tipo=piso" className="categoria-card">
            <div className="categoria-icono">
              <i className="fas fa-building"></i>
            </div>
            <h3 className="categoria-titulo">Pisos</h3>
            <p className="categoria-descripcion">Encuentra el piso perfecto para ti</p>
          </Link>
          
          <Link to="/buscar?tipo=casa" className="categoria-card">
            <div className="categoria-icono">
              <i className="fas fa-home"></i>
            </div>
            <h3 className="categoria-titulo">Casas</h3>
            <p className="categoria-descripcion">Casas con todas las comodidades</p>
          </Link>
          
          <Link to="/buscar?tipo=chalet" className="categoria-card">
            <div className="categoria-icono">
              <i className="fas fa-house-user"></i>
            </div>
            <h3 className="categoria-titulo">Chalets</h3>
            <p className="categoria-descripcion">Chalets de lujo con amplios espacios</p>
          </Link>
          
          <Link to="/buscar?tipo=local" className="categoria-card">
            <div className="categoria-icono">
              <i className="fas fa-store"></i>
            </div>
            <h3 className="categoria-titulo">Locales</h3>
            <p className="categoria-descripcion">Locales comerciales para tu negocio</p>
          </Link>
        </div>
      </section>

      <section className="seccion">
        <h2 className="seccion-titulo">¿Por qué elegirnos?</h2>
        
        <div className="beneficios-grid">
          <div className="beneficio-card">
            <div className="beneficio-icono">
              <i className="fas fa-search"></i>
            </div>
            <h3 className="beneficio-titulo">Búsqueda inteligente</h3>
            <p className="beneficio-descripcion">
              Utiliza nuestros filtros avanzados para encontrar exactamente lo que buscas.
            </p>
          </div>
          
          <div className="beneficio-card">
            <div className="beneficio-icono">
              <i className="fas fa-heart"></i>
            </div>
            <h3 className="beneficio-titulo">Guardado de favoritos</h3>
            <p className="beneficio-descripcion">
              Guarda tus propiedades favoritas para revisarlas más tarde.
            </p>
          </div>
          
          <div className="beneficio-card">
            <div className="beneficio-icono">
              <i className="fas fa-balance-scale"></i>
            </div>
            <h3 className="beneficio-titulo">Comparador de propiedades</h3>
            <p className="beneficio-descripcion">
              Compara diferentes propiedades para tomar la mejor decisión.
            </p>
          </div>
          
          <div className="beneficio-card">
            <div className="beneficio-icono">
              <i className="fas fa-envelope"></i>
            </div>
            <h3 className="beneficio-titulo">Contacto directo</h3>
            <p className="beneficio-descripcion">
              Contacta directamente con las inmobiliarias de manera sencilla.
            </p>
          </div>
        </div>
      </section>
      <section className="seccion-cta">
        <div className="cta-contenido">
          <h2 className="cta-titulo">¿Listo para encontrar tu hogar ideal?</h2>
          <p className="cta-descripcion">
            Miles de propiedades te están esperando en nuestra plataforma.
          </p>
          <Link to="/buscar" className="btn btn-primary cta-btn">
            Empezar a buscar
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Inicio; 