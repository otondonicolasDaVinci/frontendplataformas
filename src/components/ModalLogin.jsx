import { useState } from 'react';
import { usarAutenticacion } from './ContextoAutenticacion';

function ModalLogin({ cerrarModal }) {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const { iniciarSesion } = usarAutenticacion();

    const enviar = async (e) => {
        e.preventDefault();
        const resultado = await iniciarSesion(correo, contrasena);
        if (resultado) {
            cerrarModal();
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    };

    return (
        <div className="modal-login">
            <div className="contenido">
                <h2>Iniciar sesión</h2>
                <form onSubmit={enviar}>
                    <input
                        type="email"
                        placeholder="Correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        required
                    />
                    <button type="submit" className="boton-login">
                        Iniciar Sesión
                    </button>
                </form>
                <button className="boton-cerrar" onClick={cerrarModal}>
                    Cerrar
                </button>
            </div>
        </div>
    );
}

export default ModalLogin;
