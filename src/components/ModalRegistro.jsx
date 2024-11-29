import { useState } from 'react';

export default function ModalRegistro({ cerrarModal }) {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [mensaje, setMensaje] = useState('');

    const registrarUsuario = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/usuarios/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre,
                    correo,
                    contraseña,
                    rol: 'usuario',
                }),
            });

            if (response.ok) {
                setMensaje('Registro exitoso. Ahora puedes iniciar sesión.');
                setNombre('');
                setCorreo('');
                setContraseña('');
            } else {
                const errorText = await response.text();
                setMensaje(`Error al registrar: ${errorText}`);
            }
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            setMensaje('Error al conectar con el servidor.');
        }
    };

    return (
        <div className="modal-registro">
            <div className="contenido">
                <h2>Registrarse</h2>
                <form onSubmit={registrarUsuario}>
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
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
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        required
                    />
                    <button type="submit">Registrar</button>
                </form>
                {mensaje && <p>{mensaje}</p>}
                <button className="boton-cerrar" onClick={cerrarModal}>
                    Cerrar
                </button>
            </div>
        </div>
    );
}
