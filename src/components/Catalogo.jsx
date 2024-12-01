import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ModalProducto from './ModalProducto';
import { usarAutenticacion } from './ContextoAutenticacion';

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [marcaFiltro, setMarcaFiltro] = useState('');
  const [orden, setOrden] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const { token } = usarAutenticacion();

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const categoriaQuery = queryParams.get('categoria');
  const buscarQuery = queryParams.get('buscar');

  // Sincronizar la categoría y búsqueda de la URL con los filtros
  useEffect(() => {
    if (categoriaQuery) {
      setCategoriaFiltro(categoriaQuery);
    }
    if (buscarQuery) {
      setBusqueda(buscarQuery.toLowerCase());
    }
  }, [categoriaQuery, buscarQuery]);

  // Actualizar productos desde el backend
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:3001/productos');
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
  }, []);

  // Actualizar la URL al cambiar la categoría
  const manejarCambioCategoria = (nuevaCategoria) => {
    setCategoriaFiltro(nuevaCategoria);

    const params = new URLSearchParams(location.search);
    if (nuevaCategoria === '') {
      params.delete('categoria');
    } else {
      params.set('categoria', nuevaCategoria);
    }
    navigate(`?${params.toString()}`);
  };

  const productosFiltrados = productos
      .filter((producto) => (!categoriaFiltro || producto.categoria === categoriaFiltro))
      .filter((producto) => (!marcaFiltro || producto.marca === marcaFiltro))
      .filter((producto) => (!busqueda || producto.nombre.toLowerCase().includes(busqueda)))
      .sort((a, b) => {
        if (orden === 'precioAsc') return a.precio - b.precio;
        if (orden === 'precioDesc') return b.precio - a.precio;
        return 0;
      });

  return (
      <div className="catalogo">
        <h2>Catálogo</h2>
        <div className="contenido">
          <div className="filtros">
            <h3>Filtros</h3>
            <label>
              Categoría:
              <select
                  value={categoriaFiltro}
                  onChange={(e) => manejarCambioCategoria(e.target.value)}
              >
                <option value="">Todas</option>
                <option value="Mouses">Mouses</option>
                <option value="Teclados">Teclados</option>
                <option value="Audio">Audio</option>
              </select>
            </label>
            <label>
              Marca:
              <select value={marcaFiltro} onChange={(e) => setMarcaFiltro(e.target.value)}>
                <option value="">Todas</option>
                <option value="Logitech">Logitech</option>
                <option value="Redragon">Redragon</option>
              </select>
            </label>
            <label>
              Ordenar por:
              <select value={orden} onChange={(e) => setOrden(e.target.value)}>
                <option value="">Sin orden</option>
                <option value="precioAsc">Precio: Menor a Mayor</option>
                <option value="precioDesc">Precio: Mayor a Menor</option>
              </select>
            </label>
          </div>
          <div className="productos">
            {productosFiltrados.map((producto) => (
                <div
                    key={producto.id}
                    className="tarjeta-producto"
                    onClick={() => setProductoSeleccionado(producto)}
                >
                  <img src={producto.imagen} alt={producto.nombre} />
                  <p>{producto.nombre}</p>
                  <p className="precio-producto">${producto.precio.toLocaleString()}</p>
                </div>
            ))}
          </div>
        </div>
        {productoSeleccionado && (
            <ModalProducto
                producto={productoSeleccionado}
                onClose={() => setProductoSeleccionado(null)}
            />
        )}
      </div>
  );
}
