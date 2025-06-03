import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { inmobiliariaService } from '../../servicios/inmobiliariaService';
import '../../estilos/EstadisticasGlobales.css';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const EstadisticasInmobiliaria = () => {
  const navigate = useNavigate();
  const [estados, setEstados] = useState({});
  const [tipos, setTipos] = useState({});
  const [localidades, setLocalidades] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarEstadisticas = async () => {
      try {
        const inmobiliaria = await inmobiliariaService.getInmobiliariaByUserId();
        if (!inmobiliaria) {
          throw new Error('No se encontró la inmobiliaria');
        }

        const idInmobiliaria = inmobiliaria.id;

        const [estadosRes, tiposRes, localidadesRes] = await Promise.all([
          fetch(`http://localhost:8080/api/inmobilaria/viviendas/count/estado/${idInmobiliaria}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }),
          fetch(`http://localhost:8080/api/inmobilaria/viviendas/count/tipo/${idInmobiliaria}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }),
          fetch(`http://localhost:8080/api/inmobilaria/viviendas/count/localidad/${idInmobiliaria}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
        ]);

        if (!estadosRes.ok || !tiposRes.ok || !localidadesRes.ok) {
          throw new Error('Error al cargar las estadísticas');
        }

        const [estadosData, tiposData, localidadesData] = await Promise.all([
          estadosRes.json(),
          tiposRes.json(),
          localidadesRes.json()
        ]);

        setEstados(estadosData);
        setTipos(tiposData);
        setLocalidades(localidadesData);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar las estadísticas');
        setLoading(false);
      }
    };

    cargarEstadisticas();
  }, []);

  const datosEstados = {
    labels: ['Venta', 'Alquiler', 'Total'],
    datasets: [
      {
        label: 'Número de viviendas',
        data: [
          estados.venta || 0,
          estados.alquiler || 0,
          (estados.venta || 0) + (estados.alquiler || 0)
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const datosTipos = {
    labels: Object.keys(tipos).map(tipo => tipo.charAt(0).toUpperCase() + tipo.slice(1)),
    datasets: [
      {
        data: Object.values(tipos),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const datosLocalidades = {
    labels: Object.keys(localidades).map(localidad => localidad.charAt(0).toUpperCase() + localidad.slice(1)),
    datasets: [
      {
        label: 'Número de viviendas',
        data: Object.values(localidades),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const opciones = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Estadísticas de la Inmobiliaria'
      }
    }
  };

  if (loading) {
    return <div className="loading">Cargando estadísticas...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="estadisticas-container">
      <div className="header-container">
        <button 
          className="btn-volver"
          onClick={() => navigate('/admin/menu')}
        >
          ← Volver al Menú
        </button>
        <h1>Estadísticas de la Inmobiliaria</h1>
      </div>
      
      <div className="graficos-grid">
        <div className="grafico-card">
          <h2>Estado de las Viviendas</h2>
          <Bar data={datosEstados} options={opciones} />
        </div>

        <div className="grafico-card">
          <h2>Tipos de Viviendas</h2>
          <Pie data={datosTipos} options={opciones} />
        </div>

        <div className="grafico-card">
          <h2>Viviendas por Localidad</h2>
          <Bar data={datosLocalidades} options={opciones} />
        </div>
      </div>
    </div>
  );
}; 