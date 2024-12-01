import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Carousel from './Carousel';
import ModalProducto from './ModalProducto';
import {usarAutenticacion} from './ContextoAutenticacion';

export default function Home() {
    const [productos, setProductos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Mouses');
    const navegar = useNavigate();

    const categorias = [
        { categoria: 'Mouses' },
        { categoria: 'Teclados' },
        { categoria: 'Audio' },
    ];


    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch('http://localhost:3001/productos'); // Sin token
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
    }, []); // Sin token en las dependencias


    const productosDestacados = productos.filter((producto) => producto.destacado);

    const clickEnCategoria = (categoria) => {
        navegar(`/catalogo?categoria=${categoria}`);
    };

    return (
        <div>
            <Carousel/>
            <div className="home">
                <h2>Encontrá tu próximo periférico</h2>
                <div className="categorias-grilla">
                    {categorias.map(({categoria}) => (
                        <div key={categoria} className="categoria-seccion" onClick={() => clickEnCategoria(categoria)}>
                            <div className="categoria-titulo">{categoria}</div>
                        </div>
                    ))}
                </div>

                <div className="productos-destacados">
                    <h2>Productos Destacados</h2>
                    <div className="botones-filtro">
                        {['Mouses', 'Teclados', 'Audio'].map((categoria) => (
                            <button
                                key={categoria}
                                className={`boton-filtro ${categoriaSeleccionada === categoria ? 'activo' : ''}`}
                                onClick={() => setCategoriaSeleccionada(categoria)}
                            >
                                {categoria}
                            </button>
                        ))}
                    </div>
                    <div className="lista-productos">
                        {productosDestacados
                            .filter((producto) => producto.categoria === categoriaSeleccionada)
                            .map((producto) => (
                                <div
                                    key={producto.id}
                                    className="tarjeta-producto"
                                    onClick={() => setProductoSeleccionado(producto)}
                                >
                                    <img src={producto.imagen} alt={producto.nombre}/>
                                    <p>{producto.nombre}</p>
                                    <p className="precio-producto">${producto.precio.toLocaleString()}</p>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            {productoSeleccionado && (
                <ModalProducto producto={productoSeleccionado} onClose={() => setProductoSeleccionado(null)}/>
            )}
        </div>
    );
}
