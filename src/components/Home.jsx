import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from './Carousel';
import ModalProducto from './ModalProducto';
import { productos } from '../data/catalogo';

import mouse from '../assets/images/catalogo/mouses/redragon/redragon-king-pro-m916.png';
import teclado from '../assets/images/catalogo/teclados/redragon/redragon-horus-fullsize.png';
import audio from '../assets/images/catalogo/audio/redragon/redragon-zeus-x.png';

export default function Home() {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Mouses");
  const navegar = useNavigate();

  const categorias = [
    { categoria: "Mouses", imagen: mouse },
    { categoria: "Teclados", imagen: teclado },
    { categoria: "Audio", imagen: audio },
  ];

  const clickEnCategoria = (categoria) => {
    navegar(`/catalogo?categoria=${categoria}`);
  };

  const productosDestacados = productos
  
  .filter((producto) => producto.destacado)

  .reduce((destacados, producto) => {
    const { categoria } = producto;

    if (!destacados[categoria]) {
      destacados[categoria] = [];
    }

    if (destacados[categoria].length < 5) {
      destacados[categoria].push(producto);
    }

      return destacados;
  }, {});

  return (
    <div>
      <Carousel />

      <div className="home">

        <h2>Encontrá tu próximo periférico</h2>

        <div className="categorias-grilla">

          {categorias.map(({ categoria, imagen }) => (

            <div key={categoria} className="categoria-seccion" onClick={() => clickEnCategoria(categoria)}>

              <img src={imagen} alt={categoria} className="categoria-imagen" />

              <div className="categoria-titulo">{categoria}</div>

            </div>

          ))}

        </div>

        <div className="productos-destacados">

          <h2>Productos Destacados</h2>

          <div className="botones-filtro">

            {Object.keys(productosDestacados).map((categoria) => (

              <button key={categoria} className={`boton-filtro ${categoriaSeleccionada === categoria ? 'activo' : ''}`} onClick={() => setCategoriaSeleccionada(categoria)}>
                {categoria}
              </button>

            ))}

          </div>

          <div className="lista-productos">
            {productosDestacados[categoriaSeleccionada]?.map((producto) => (
              <div key={producto.id} className="tarjeta-producto" onClick={() => setProductoSeleccionado(producto)} >

                <img src={producto.imagen} alt={producto.nombre} />

                <p>{producto.nombre}</p>

                <p className="precio-producto">${producto.precio.toLocaleString()}</p>

              </div>

            ))}

            {productoSeleccionado && (
              <ModalProducto producto={productoSeleccionado} onClose={() => setProductoSeleccionado(null)} />)
            }

          </div>

        </div>

      </div>

    </div>

  );

}
