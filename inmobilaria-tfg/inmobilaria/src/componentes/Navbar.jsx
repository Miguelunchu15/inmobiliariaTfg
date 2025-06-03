import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">InmobiVista</span>
        </Link>

        <div className="navbar-icon" onClick={toggleMenu}>
          <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>

        <ul className={isMenuOpen ? 'navbar-menu active' : 'navbar-menu'}>
          <li className="navbar-item">
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'navbar-link active' : 'navbar-link'}
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/buscar" 
              className={location.pathname === '/buscar' ? 'navbar-link active' : 'navbar-link'}
              onClick={() => setIsMenuOpen(false)}
            >
              Buscar Viviendas
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/comparar" 
              className={location.pathname === '/comparar' ? 'navbar-link active' : 'navbar-link'}
              onClick={() => setIsMenuOpen(false)}
            >
              Comparar
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/favoritos" 
              className={location.pathname === '/favoritos' ? 'navbar-link active' : 'navbar-link'}
              onClick={() => setIsMenuOpen(false)}
            >
              Favoritos
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/contacto" 
              className={location.pathname === '/contacto' ? 'navbar-link active' : 'navbar-link'}
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 