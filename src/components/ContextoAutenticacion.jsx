import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const ContextoAutenticacion = createContext();

export function usarAutenticacion() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useContext(ContextoAutenticacion);
}

export default function ProveedorAutenticacion({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [token, setToken] = useState(null);

    const iniciarSesion = async (correo, contraseña) => {
        try {
            const response = await fetch('http://localhost:3001/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo, contraseña }),
            });

            if (response.ok) {
                const data = await response.json();
                setToken(data.token);
                setUsuario({ rol: data.rol });
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error en iniciarSesion:', error);
            return false;
        }
    };

    const cerrarSesion = () => {
        setUsuario(null);
        setToken(null);
    };

    return (
        <ContextoAutenticacion.Provider value={{ token, usuario, iniciarSesion, cerrarSesion }}>
            {children}
        </ContextoAutenticacion.Provider>
    );
}

// Validación de props para ProveedorAutenticacion
ProveedorAutenticacion.propTypes = {
    children: PropTypes.node.isRequired,
};
