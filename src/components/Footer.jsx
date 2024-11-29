import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">

      <div className="contenido">

        <div className="seccion">
          <h4>Contacto</h4>
          <p>Email: soporte@techgear.com</p>
          <p>Teléfono: +54 9 11 1234-5678</p>
        </div>

        <div className="seccion">
          <h4>Redes Sociales</h4>
          <p>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> | 
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"> Twitter</a> | 
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"> Instagram</a>
          </p>
        </div>

        <div className="seccion">
          <h4>Legal</h4>
          <p>
            <a href="/">Términos y Condiciones</a> | 
            <a href="/">Política de Privacidad</a>
          </p>
        </div>
        
      </div>

      <div className="bottom">
        <p>&copy; {new Date().getFullYear()} TechGear. Todos los derechos reservados. <br/> Mariana Otondo - Nicolás Otondo | Materia: Plataformas de Desarrollo | Docente: Fernando Gaitán | Escuela Da Vinci - Cuatrimestre 2 - 2024</p>
      </div>

    </footer>
  );
}
