import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../servicios/authService';
import { inmobiliariaService } from '../../servicios/inmobiliariaService';
import '../../estilos/AdminMenu.css';

export const AdminMenu = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        // Verificar si hay token y email
        const token = authService.getToken();
        const email = authService.getEmail();
        
        if (!token || !email) {
          console.log('No hay token o email, redirigiendo a login');
          navigate('/login');
          return;
        }

        setUserEmail(email);

        const inmobiliaria = await inmobiliariaService.getInmobiliariaByUserId();
        console.log('Respuesta de inmobiliaria:', inmobiliaria);
        
        // Si no hay inmobiliaria, es admin
        setIsAdmin(!inmobiliaria);
        
        if (inmobiliaria) {
          console.log('ID de inmobiliaria encontrado:', inmobiliaria.id);
        } else {
          console.log('No se encontró inmobiliaria, usuario es admin');
        }
      } catch (error) {
        console.error('Error al verificar rol:', error);
        setError('Error al cargar los datos. Por favor, intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    checkUserRole();
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    inmobiliariaService.clearInmobiliariaData();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading-message">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-container">
        <div className="error-message">
          {error}
          <button 
            onClick={() => navigate('/login')} 
            className="btn-retry"
          >
            Volver al login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <nav className="admin-navbar">
        <div className="admin-navbar-content">
          <div className="admin-header">
            <h1 className="admin-title">Panel de Administración</h1>
            <span className="user-email">{userEmail}</span>
          </div>
          <button onClick={handleLogout} className="logout-button">
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <main className="admin-main">
        <div className="admin-content">
          <h2 className="welcome-title">
            Bienvenido al Panel de {isAdmin ? 'Administración' : 'Inmobiliaria'}
          </h2>
          <p className="welcome-text">
            {isAdmin 
              ? 'Gestiona todos los aspectos del sistema desde este panel.'
              : 'Gestiona tu inmobiliaria desde este panel de control.'}
          </p>

          <div className="admin-grid">
            {isAdmin ? (
              <>
                <div 
                  className="admin-card clickable"
                  onClick={() => navigate('/admin/usuarios')}
                >
                  <h3 className="card-title">Gestión de Usuarios</h3>
                  <p className="card-text">
                    Administra las cuentas de usuarios y permisos
                  </p>
                </div>

                <div 
                  className="admin-card clickable"
                  onClick={() => navigate('/admin/estadisticas')}
                >
                  <h3 className="card-title">Estadísticas Globales</h3>
                  <p className="card-text">
                    Visualiza las estadísticas de todo el sistema
                  </p>
                </div>

                <div className="admin-card">
                  <h3 className="card-title">Consultas de Clientes</h3>
                  <p className="card-text">
                    Gestiona todas las consultas recibidas
                  </p>
                </div>

                <div 
                  className="admin-card clickable"
                  onClick={() => navigate('/admin/inmobiliarias')}
                >
                  <h3 className="card-title">Gestión de Inmobiliarias</h3>
                  <p className="card-text">
                    Administra las inmobiliarias del sistema
                  </p>
                </div>
              </>
            ) : (
              <>
                <div 
                  className="admin-card clickable"
                  onClick={() => navigate('/admin/propiedades')}
                >
                  <h3 className="card-title">Propiedades</h3>
                  <p className="card-text">
                    Gestiona las propiedades de tu inmobiliaria
                  </p>
                </div>

                <div 
                  className="admin-card clickable"
                  onClick={() => navigate('/admin/estadisticas-inmobiliaria')}
                >
                  <h3 className="card-title">Estadísticas</h3>
                  <p className="card-text">
                    Visualiza las estadísticas de tu inmobiliaria
                  </p>
                </div>

                <div className="admin-card">
                  <h3 className="card-title">Consultas de Clientes</h3>
                  <p className="card-text">
                    Gestiona las consultas de tus clientes
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}; 