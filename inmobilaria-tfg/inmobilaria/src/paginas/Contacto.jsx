import { useState } from 'react';
import '../estilos/Contacto.css';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado:', formData);
    setEnviado(true);
    // Resetear el formulario
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      asunto: '',
      mensaje: ''
    });
    // Mostrar el mensaje de éxito durante 3 segundos
    setTimeout(() => setEnviado(false), 3000);
  };

  return (
    <div className="contacto-pagina">
      <div className="contacto-header">
        <h1>Contacta con Nosotros</h1>
        <p>Estamos aquí para ayudarte a encontrar tu hogar ideal</p>
      </div>

      <div className="contacto-contenido">
        <div className="contacto-info">
          <h2>Información de Contacto</h2>
          <div className="info-item">
            <i className="fas fa-map-marker-alt"></i>
            <div>
              <h3>Sede Central Madrid</h3>
              <p>Torre Picasso, Planta 24</p>
              <p>Plaza Pablo Ruiz Picasso 1</p>
              <p>28020 Madrid, España</p>
            </div>
          </div>
          <div className="info-item">
            <i className="fas fa-phone"></i>
            <div>
              <h3>Teléfono</h3>
              <p>+34 910 123 456</p>
              <p>Lun - Vie: 9:00 - 20:00</p>
            </div>
          </div>
          <div className="info-item">
            <i className="fas fa-envelope"></i>
            <div>
              <h3>Email</h3>
              <p>sede.madrid@vespertino.es</p>
            </div>
          </div>
          <div className="redes-sociales">
            <h3>Síguenos en</h3>
            <div className="redes-icons">
              <a href="#" className="red-social"><i className="fab fa-facebook"></i></a>
              <a href="#" className="red-social"><i className="fab fa-twitter"></i></a>
              <a href="#" className="red-social"><i className="fab fa-instagram"></i></a>
              <a href="#" className="red-social"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>

        <div className="contacto-formulario">
          <h2>Envíanos un Mensaje</h2>
          {enviado && (
            <div className="mensaje-exito">
              ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-grupo">
              <label htmlFor="nombre">Nombre completo *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                placeholder="Tu nombre"
              />
            </div>
            <div className="form-grupo">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="tu@email.com"
              />
            </div>
            <div className="form-grupo">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Tu número de teléfono"
              />
            </div>
            <div className="form-grupo">
              <label htmlFor="asunto">Asunto *</label>
              <input
                type="text"
                id="asunto"
                name="asunto"
                value={formData.asunto}
                onChange={handleChange}
                required
                placeholder="Asunto del mensaje"
              />
            </div>
            <div className="form-grupo">
              <label htmlFor="mensaje">Mensaje *</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
                placeholder="Escribe tu mensaje aquí..."
                rows="5"
              ></textarea>
            </div>
            <button type="submit" className="btn-enviar">
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacto; 