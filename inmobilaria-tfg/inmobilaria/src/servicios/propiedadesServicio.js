import { collection, getDocs, query, where, doc, getDoc, limit } from 'firebase/firestore';
import { db } from '../firebase';

// Obtener todas las propiedades
export const obtenerPropiedades = async () => {
  try {
    const propiedadesRef = collection(db, 'propiedades');
    const snapshot = await getDocs(propiedadesRef);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error al obtener propiedades:', error);
    throw error;
  }
};

// Obtener propiedades por término de búsqueda
export const buscarPropiedades = async (termino) => {
  try {
    const propiedades = await obtenerPropiedades();
    
    if (!termino.trim()) {
      return propiedades;
    }
    
    const terminoLower = termino.toLowerCase();
    
    // Buscar en título, ubicación, descripción
    return propiedades.filter(propiedad => 
      propiedad.titulo?.toLowerCase().includes(terminoLower) ||
      propiedad.ubicacion?.toLowerCase().includes(terminoLower) ||
      propiedad.descripcion?.toLowerCase().includes(terminoLower)
    );
  } catch (error) {
    console.error('Error al buscar propiedades:', error);
    throw error;
  }
};

// Obtener una propiedad por su ID
export const obtenerPropiedadPorId = async (id) => {
  try {
    const propiedadRef = doc(db, 'propiedades', id);
    const docSnap = await getDoc(propiedadRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error('La propiedad no existe');
    }
  } catch (error) {
    console.error('Error al obtener la propiedad:', error);
    throw error;
  }
};

// Obtener las características comparables de las propiedades
export const obtenerCaracteristicasComparables = () => {
  return [
    { id: 'precio', nombre: 'Precio', tipo: 'numero' },
    { id: 'superficie', nombre: 'Superficie', tipo: 'numero', unidad: 'm²' },
    { id: 'habitaciones', nombre: 'Habitaciones', tipo: 'numero' },
    { id: 'banos', nombre: 'Baños', tipo: 'numero' },
    { id: 'garaje', nombre: 'Plazas de garaje', tipo: 'numero' },
    { id: 'tipo', nombre: 'Tipo de propiedad', tipo: 'texto' },
    { id: 'estado', nombre: 'Estado', tipo: 'texto' }
  ];
};

// Formatear valor para la comparación según su tipo
export const formatearValorComparable = (valor, tipo, unidad = '') => {
  if (valor === undefined || valor === null) {
    return '-';
  }
  
  switch (tipo) {
    case 'numero':
      return typeof valor === 'number' 
        ? `${new Intl.NumberFormat('es-ES').format(valor)}${unidad ? ' ' + unidad : ''}`
        : '-';
    case 'booleano':
      return valor === true ? 'Sí' : 'No';
    case 'texto':
      return valor || '-';
    default:
      return String(valor);
  }
};

// Obtener valor de una propiedad por su ruta (permite acceder a propiedades anidadas)
export const obtenerValorPropiedad = (objeto, ruta) => {
  if (!objeto || !ruta) return undefined;
  
  const partes = ruta.split('.');
  let resultado = objeto;
  
  for (const parte of partes) {
    if (resultado === undefined || resultado === null) return undefined;
    resultado = resultado[parte];
  }
  
  return resultado;
}; 