import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usarAutenticacion } from './ContextoAutenticacion';
import ModalLogin from './ModalLogin';
import ModalRegistro from './ModalRegistro';

export default function Header() {
    const { usuario, cerrarSesion } = usarAutenticacion();
    const [mostrarDropdown, setMostrarDropdown] = useState(false);
    const [mostrarModalLogin, setMostrarModalLogin] = useState(false);
    const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);

    const toggleDropdown = () => setMostrarDropdown(!mostrarDropdown);

    return (
        <header className="header">
            <div className="header-left">
                <Link to="/" className="logo">TechGear</Link>
                <nav className="header-nav">
                    <Link to="/catalogo">Productos</Link>
                    {usuario?.rol === 'administrador' && (
                        <>
                            <Link to="/abm-productos">ABM Productos</Link>
                            <Link to="/abm-usuarios">ABM Usuarios</Link>
                        </>
                    )}
                </nav>
            </div>

            <div className="buscar">
                <input type="text" placeholder="Buscar" className="input" />
                <button className="boton-buscar"><i className="fas fa-search"></i></button>
            </div>

            <div className="acciones">
                <Link to="/">Contacto</Link>

                {usuario ? (
                    <div
                        className="seccion-admin"
                        onMouseEnter={toggleDropdown}
                        onMouseLeave={toggleDropdown}
                    >
                        <span><i className="fas fa-user"></i> {usuario.rol}</span>
                        {mostrarDropdown && (
                            <div className="dropdown">
                                <Link to="/">Perfil</Link>
                                <a onClick={cerrarSesion}>Cerrar Sesión</a>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <a onClick={() => setMostrarModalLogin(true)}>
                            <i className="fas fa-user"></i> Login
                        </a>
                        <a onClick={() => setMostrarModalRegistro(true)}>
                            Registrarse
                        </a>
                    </>
                )}

                <Link to="/carrito">
                    <i className="fas fa-shopping-cart"></i>
                </Link>
            </div>

            {mostrarModalLogin && (
                <ModalLogin
                    cerrarModal={() => setMostrarModalLogin(false)}
                    loginExitoso={() => setMostrarModalLogin(false)}
                />
            )}

            {mostrarModalRegistro && (
                <ModalRegistro
                    cerrarModal={() => setMostrarModalRegistro(false)}
                />
            )}
        </header>
    );
}
