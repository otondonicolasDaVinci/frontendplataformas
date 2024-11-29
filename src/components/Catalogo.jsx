import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { productos } from '../data/catalogo';
import ModalProducto from './ModalProducto';

export default function Catalogo() {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [marcaFiltro, setMarcaFiltro] = useState('');
  const [orden, setOrden] = useState('');
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoriaQuery = queryParams.get('categoria');

  useEffect(() => {
    if (categoriaQuery) {
      setCategoriaFiltro(categoriaQuery);
    }
  }, [categoriaQuery]);

  const productosFiltrados = productos
    .filter((producto) => (!categoriaFiltro || producto.categoria === categoriaFiltro))
    .filter((producto) => (!marcaFiltro || producto.marca === marcaFiltro))
    .sort((a, b) => {
      if (orden === 'precioAsc') return a.precio - b.precio;
      if (orden === 'precioDesc') return b.precio - a.precio;
      return 0;
    });

  return (
    <div className="catalogo">

      <h2>Catálogo</h2>

      <div className="contenido">
        
        {/*Filtros*/}
        <div className="filtros">

          <h3>Filtros</h3>

          <label>

            Categoría:
            <select value={categoriaFiltro} onChange={(e) => setCategoriaFiltro(e.target.value)}>
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

        {/*Productos*/}
        <div className="productos">
          {productosFiltrados.map((producto) => (
            <div key={producto.id} className="tarjeta-producto" onClick={() => setProductoSeleccionado(producto)}>
              <img src={producto.imagen} alt={producto.nombre} />
              <p>{producto.nombre}</p>
              <p className="precio-producto">${producto.precio.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/*Modal del producto que se abre al hacer click*/}
      {productoSeleccionado && (
        <ModalProducto
          producto={productoSeleccionado}
          onClose={() => setProductoSeleccionado(null)}
        />
      )}

    </div>
  );
}
