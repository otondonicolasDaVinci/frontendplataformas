import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContextoCarrito = createContext();

export function usarCarrito() {
  return useContext(ContextoCarrito);
}

export default function ProveedorCarrito({ children }) {
  const [carrito, setCarrito] = useState([]);
  const navegar = useNavigate();

  const agregarAlCarrito = (producto) => {
    setCarrito((carritoPrevio) => {
      const productoExistente = carritoPrevio.find((item) => item.id === producto.id);
      if (productoExistente) {
        return carritoPrevio.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...carritoPrevio, { ...producto, cantidad: 1 }];
    });
    navegar('/carrito');
  };

  const eliminarDelCarrito = (idProducto) => {
    setCarrito((carritoPrevio) => carritoPrevio.filter((item) => item.id !== idProducto));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const actualizarCantidad = (idProducto, nuevaCantidad) => {
    setCarrito((carritoPrevio) =>
      carritoPrevio.map((item) =>
        item.id === idProducto ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  const totalCompra = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);

  return (
    <ContextoCarrito.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        actualizarCantidad,
        totalCompra,
      }}
    >
      {children}
    </ContextoCarrito.Provider>
  );
}
