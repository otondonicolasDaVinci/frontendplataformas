import { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalLogin from './ModalLogin';

export default function Header() {
  const [autenticado, setAutenticado] = useState(false);
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const [mostrarModalLogin, setMostrarModalLogin] = useState(false);

  const toggleDropdown = () => setMostrarDropdown(!mostrarDropdown);
  const loginExitoso = () => {
    setAutenticado(true);
    setMostrarModalLogin(false);
  };

  return (
    <header className="header">
      
      <div className="header-left">

        <Link to="/" className="logo">TechGear</Link>
        
        <nav className="header-nav">
          <Link to="/catalogo">Productos</Link>
        </nav>

      </div>

      <div className="buscar">
        <input type="text" placeholder="Buscar" className="input" />
        <button className="boton-buscar"><i className="fas fa-search"></i></button>
      </div>

      <div className="acciones">
        
        <Link to="/">Contacto</Link>
        
        {autenticado ? (
            <div className="seccion-admin" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
              
              <span> <i className="fas fa-user"></i> Administrador</span>
              
              {mostrarDropdown && (
                <div className="dropdown">
                  <Link to="/">Perfil</Link>
                  <a onClick={() => setAutenticado(false)}>Cerrar Sesión</a>
                </div>
              )}

            </div>

          ):(<a onClick={() => setMostrarModalLogin(true)}><i className="fas fa-user"></i> Login </a>)

        }

        <Link to="/carrito">
          <i className="fas fa-shopping-cart"></i>
        </Link>

      </div>

      {mostrarModalLogin &&
        (<ModalLogin cerrarModal={() => setMostrarModalLogin(false)} loginExitoso={loginExitoso}/>)
      }

    </header>

  );

}

