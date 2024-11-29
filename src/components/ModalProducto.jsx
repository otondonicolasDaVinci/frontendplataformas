import { usarCarrito } from './ContextoCarrito';

export default function ModalProducto({ producto, onClose }) {
  const { agregarAlCarrito } = usarCarrito();

  if (!producto) {
    return null;
  }

  return (
    <div className="modal-producto">

      <div className="contenido layout-horizontal">

        <div className="producto-imagen">
          <img src={producto.imagen} alt={producto.nombre} />
        </div>

        <div className="producto-detalles">
          <h2>{producto.nombre}</h2>
          <div>
            <h3>Detalles del producto</h3>
            <p className="descripcion-producto">{producto.descripcion || 'Descripción no disponible.'}</p>
          </div>
          <p className="precio-producto">${producto.precio.toLocaleString()}</p>

          <div className="botones">
            <button className="boton-cerrar" onClick={onClose}>Cerrar</button>
            
            <button className="boton-agregaralcarrito" onClick={() => { agregarAlCarrito(producto); onClose(); }}>
              Agregar al Carrito
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
