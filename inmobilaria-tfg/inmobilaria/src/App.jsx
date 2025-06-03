import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Importar páginas
import Inicio from './paginas/Inicio';
import Buscar from './paginas/Buscar';
import DetalleVivienda from './paginas/DetalleVivienda';
import Favoritos from './paginas/Favoritos';
import Contacto from './paginas/Contacto';
import CompararViviendas from './paginas/CompararViviendas';
import { Login } from './paginas/Login';
import { AdminMenu } from './paginas/admin/Menu';
import { Propiedades } from './paginas/admin/Propiedades';
import { CrearVivienda } from './paginas/admin/CrearVivienda';
import { GestionarImagenes } from './paginas/admin/GestionarImagenes';
import { ProtectedRoute } from './componentes/ProtectedRoute';
import { Inmobiliarias } from './paginas/admin/Inmobiliarias';
import { FormularioInmobiliaria } from './paginas/admin/FormularioInmobiliaria';
import { Usuarios } from './paginas/admin/Usuarios';
import { FormularioUsuario } from './paginas/admin/FormularioUsuario';
import { EstadisticasGlobales } from './paginas/admin/EstadisticasGlobales';
import { EstadisticasInmobiliaria } from './paginas/admin/EstadisticasInmobiliaria';

// Importar componentes
import Navbar from './componentes/Navbar';
import Footer from './componentes/Footer';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          
          {/* Rutas protegidas de administración */}
          <Route
            path="/admin/menu"
            element={
              <ProtectedRoute>
                <AdminMenu />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/propiedades"
            element={
              <ProtectedRoute>
                <Propiedades />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/propiedades/crear"
            element={
              <ProtectedRoute>
                <CrearVivienda />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/propiedades/crear/:id"
            element={
              <ProtectedRoute>
                <CrearVivienda />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/propiedades/imagenes/:id"
            element={
              <ProtectedRoute>
                <GestionarImagenes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/inmobiliarias"
            element={
              <ProtectedRoute>
                <Inmobiliarias />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/inmobiliarias/crear"
            element={
              <ProtectedRoute>
                <FormularioInmobiliaria />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/inmobiliarias/editar/:id"
            element={
              <ProtectedRoute>
                <FormularioInmobiliaria />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/usuarios"
            element={
              <ProtectedRoute>
                <Usuarios />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/usuarios/crear"
            element={
              <ProtectedRoute>
                <FormularioUsuario />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/usuarios/editar/:id"
            element={
              <ProtectedRoute>
                <FormularioUsuario />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/estadisticas"
            element={
              <ProtectedRoute>
                <EstadisticasGlobales />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/estadisticas-inmobiliaria"
            element={
              <ProtectedRoute>
                <EstadisticasInmobiliaria />
              </ProtectedRoute>
            }
          />

          {/* Rutas con navegación normal */}
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <main className="content">
                  <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/buscar" element={<Buscar />} />
                    <Route path="/vivienda/:id" element={<DetalleVivienda />} />
                    <Route path="/favoritos" element={<Favoritos />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/comparar" element={<CompararViviendas />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
