import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">InmobiVista</h3>
          <p className="footer-description">
            Tu portal inmobiliario de confianza. Encuentra tu hogar ideal con nosotros.
          </p>
          <div className="footer-social">
            <a href="#" className="social-link">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Enlaces rápidos</h3>
          <ul className="footer-links">
            <li>
              <Link to="/" className="footer-link">Inicio</Link>
            </li>
            <li>
              <Link to="/buscar" className="footer-link">Buscar Viviendas</Link>
            </li>
            <li>
              <Link to="/comparar" className="footer-link">Comparar</Link>
            </li>
            <li>
              <Link to="/favoritos" className="footer-link">Favoritos</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Tipos de propiedades</h3>
          <ul className="footer-links">
            <li>
              <Link to="/buscar?tipo=apartamento" className="footer-link">Apartamentos</Link>
            </li>
            <li>
              <Link to="/buscar?tipo=casa" className="footer-link">Casas</Link>
            </li>
            <li>
              <Link to="/buscar?tipo=chalet" className="footer-link">Chalets</Link>
            </li>
            <li>
              <Link to="/buscar?tipo=oficina" className="footer-link">Oficinas</Link>
            </li>
            <li>
              <Link to="/buscar?tipo=local" className="footer-link">Locales</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Contacto</h3>
          <address className="footer-contact">
            <p>
              <i className="fas fa-map-marker-alt"></i> Calle Principal 123, Madrid
            </p>
            <p>
              <i className="fas fa-phone"></i> +34 912 345 678
            </p>
            <p>
              <i className="fas fa-envelope"></i> info@inmobivista.com
            </p>
          </address>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">
          &copy; {currentYear} InmobiVista. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer; 