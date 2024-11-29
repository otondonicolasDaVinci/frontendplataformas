import { usarCarrito } from './ContextoCarrito';
import { useNavigate } from 'react-router-dom';

export default function Carrito() {
  const { carrito, eliminarDelCarrito, vaciarCarrito, totalCompra, actualizarCantidad } = usarCarrito();
  const navegar = useNavigate();

  return (
    <div className="carrito">
      
      <h2>Carrito</h2>
      
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul>
            {carrito.map((item) => (
              <li key={item.id} className="item">
                <img src={item.imagen} alt={item.nombre} className="imagen-producto" />
                <div>
                  <h3 className="titulo-producto">{item.nombre}</h3>
                  <p>${item.precio.toLocaleString()}</p>
                  
                  <div className="contador-cantidad">
                    {item.cantidad === 1 ? (
                      <button className="boton-eliminar" onClick={() => eliminarDelCarrito(item.id)}>
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    ) : (
                      <button className="restar-unidad" onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}>
                        -
                      </button>
                    )}
                    <span>{item.cantidad}</span>
                    <button className="sumar-unidad" onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}>
                      +
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <h3 className="total">Total: ${totalCompra.toLocaleString()}</h3>
          <div className="boton-acciones">
            <button className="boton-vaciar" onClick={vaciarCarrito}>Vaciar Carrito</button>
            <button onClick={() => navegar('/checkout')}>Continuar</button>
          </div>
        </>
      )}
    </div>
  );
}

