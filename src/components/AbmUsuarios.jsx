import { useState, useEffect } from 'react';
import { usarAutenticacion } from './ContextoAutenticacion';

export default function ABMUsuarios() {
    const { token } = usarAutenticacion();
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [rol, setRol] = useState('usuario');

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await fetch('http://localhost:3001/usuarios', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUsuarios(data);
                } else {
                    console.error('Error al obtener los usuarios:', response.statusText);
                }
            } catch (error) {
                console.error('Error al conectar con el backend:', error);
            }
        };

        fetchUsuarios();
    }, [token]);

    const guardarUsuario = async (e) => {
        e.preventDefault();
        try {
            const method = usuarioSeleccionado ? 'PUT' : 'POST';
            const endpoint = usuarioSeleccionado
                ? `http://localhost:3001/usuarios/${usuarioSeleccionado.id}`
                : 'http://localhost:3001/usuarios/registro';

            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ nombre, correo, contraseña, rol }),
            });

            if (response.ok) {
                if (method === 'POST') {
                    const nuevoUsuario = await response.json();
                    setUsuarios([...usuarios, nuevoUsuario.usuario]);
                } else {
                    const usuarioActualizado = await response.json();
                    setUsuarios(
                        usuarios.map((u) =>
                            u.id === usuarioActualizado.id ? usuarioActualizado : u
                        )
                    );
                }
                limpiarFormulario();
            } else {
                console.error('Error al guardar el usuario:', response.statusText);
            }
        } catch (error) {
            console.error('Error al guardar el usuario:', error);
        }
    };

    const eliminarUsuario = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/usuarios/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
            } else {
                console.error('Error al eliminar el usuario:', response.statusText);
            }
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    };

    const limpiarFormulario = () => {
        setNombre('');
        setCorreo('');
        setContraseña('');
        setRol('usuario');
        setUsuarioSeleccionado(null);
    };

    return (
        <div className="abm">
            <h2>Administración de Usuarios</h2>
            <form onSubmit={guardarUsuario} className="abm-header">
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
                />
                <select value={rol} onChange={(e) => setRol(e.target.value)}>
                    <option value="usuario">Usuario</option>
                    <option value="administrador">Administrador</option>
                </select>
                <button type="submit">
                    {usuarioSeleccionado ? 'Guardar Cambios' : 'Guardar'}
                </button>
                {usuarioSeleccionado && (
                    <button type="button" onClick={limpiarFormulario}>
                        Cancelar
                    </button>
                )}
            </form>

            <div className="tabla-usuarios">
                <h3>Lista de Usuarios</h3>
                <table className="abm-table">
                    <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.correo}</td>
                            <td>{usuario.rol}</td>
                            <td>
                                <button
                                    className="button editar"
                                    onClick={() => {
                                        setUsuarioSeleccionado(usuario);
                                        setNombre(usuario.nombre);
                                        setCorreo(usuario.correo);
                                        setRol(usuario.rol);
                                    }}
                                >
                                    Editar
                                </button>
                                <button
                                    className="button eliminar"
                                    onClick={() => eliminarUsuario(usuario.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
