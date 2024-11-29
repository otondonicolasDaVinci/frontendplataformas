import { useState, useEffect } from 'react';
import { usarAutenticacion } from './ContextoAutenticacion';

export default function ABMProductos() {
    const { token } = usarAutenticacion();
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [categoria, setCategoria] = useState('');
    const [marca, setMarca] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState('');
    const [productoEnEdicion, setProductoEnEdicion] = useState(null);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch('http://localhost:3001/productos', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setProductos(data);
                } else {
                    console.error('Error al obtener los productos');
                }
            } catch (error) {
                console.error('Error al conectar con el backend', error);
            }
        };
        fetchProductos();
    }, [token]);

    const guardarProducto = async () => {
        const nuevoProducto = { nombre, categoria, marca, precio, descripcion, imagen };

        try {
            const response = await fetch(
                productoEnEdicion
                    ? `http://localhost:3001/productos/${productoEnEdicion.id}`
                    : 'http://localhost:3001/productos',
                {
                    method: productoEnEdicion ? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(nuevoProducto),
                }
            );

            if (response.ok) {
                const productoGuardado = await response.json();
                if (productoEnEdicion) {
                    setProductos(
                        productos.map((prod) =>
                            prod.id === productoGuardado.id ? productoGuardado : prod
                        )
                    );
                } else {
                    setProductos([...productos, productoGuardado]);
                }

                limpiarFormulario();
            } else {
                console.error('Error al guardar el producto');
            }
        } catch (error) {
            console.error('Error al conectar con el backend', error);
        }
    };

    const eliminarProducto = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/productos/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setProductos(productos.filter((producto) => producto.id !== id));
            } else {
                console.error('Error al eliminar el producto');
            }
        } catch (error) {
            console.error('Error al conectar con el backend', error);
        }
    };

    const limpiarFormulario = () => {
        setNombre('');
        setCategoria('');
        setMarca('');
        setPrecio('');
        setDescripcion('');
        setImagen('');
        setProductoEnEdicion(null);
    };

    const iniciarEdicion = (producto) => {
        setProductoEnEdicion(producto);
        setNombre(producto.nombre);
        setCategoria(producto.categoria);
        setMarca(producto.marca);
        setPrecio(producto.precio);
        setDescripcion(producto.descripcion);
        setImagen(producto.imagen);
    };

    return (
        <div className="abm">
            <h2>Administración de Productos</h2>
            <div className="abm-header">
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Categoría"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Marca"
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="URL de la Imagen"
                    value={imagen}
                    onChange={(e) => setImagen(e.target.value)}
                />
                <button onClick={guardarProducto}>
                    {productoEnEdicion ? 'Guardar Cambios' : 'Guardar'}
                </button>
                {productoEnEdicion && (
                    <button onClick={limpiarFormulario}>Cancelar Edición</button>
                )}
            </div>
            <h3>Lista de Productos</h3>
            <table className="abm-table">
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Marca</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {productos.map((producto) => (
                    <tr key={producto.id}>
                        <td>{producto.nombre}</td>
                        <td>{producto.categoria}</td>
                        <td>{producto.marca}</td>
                        <td>${producto.precio.toLocaleString()}</td>
                        <td>
                            <button
                                className="button editar"
                                onClick={() => iniciarEdicion(producto)}
                            >
                                Editar
                            </button>
                            <button
                                className="button eliminar"
                                onClick={() => eliminarProducto(producto.id)}
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
