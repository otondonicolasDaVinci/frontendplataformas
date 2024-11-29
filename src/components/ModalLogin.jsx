import { useState } from 'react';

export default function ModalLogin({ cerrarModal, loginExitoso }) {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const enviar = (e) => {
    e.preventDefault();
    if (usuario === 'admin' && contrasena === 'admin123') {
      loginExitoso();
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="modal-login">
      <div className="contenido">
        
        <h2>Iniciar sesión</h2>
        
        <form onSubmit={enviar}>
          <input type="text" placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)}/>
          <input type="password" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)}/>
          <button type="submit" className="boton-login">Iniciar Sesión</button>
        </form>
        
        <button className="boton-cerrar" onClick={cerrarModal}>Cerrar</button>

      </div>

    </div>
  );
}


