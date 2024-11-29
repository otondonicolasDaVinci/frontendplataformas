import { useState, useEffect } from 'react';

import carousel1 from '../assets/images/carousel/img1.png';
import carousel2 from '../assets/images/carousel/img2.png';
import carousel3 from '../assets/images/carousel/img3.png';

const imagenes = [carousel1, carousel2, carousel3];

export default function Carousel() {
  const [indiceActual, setIndiceActual] = useState(0);

  const siguiente = () => {
    
    if (indiceActual + 1 >= imagenes.length) {

      setIndiceActual(0);

    } else {

      setIndiceActual(indiceActual + 1);
    }

  };

  const anterior = () => {
    
    if (indiceActual - 1 < 0) {

      setIndiceActual(imagenes.length - 1);

    } else {

      setIndiceActual(indiceActual - 1);

    }

  };

  useEffect(() => {

    const intervalo = setInterval(siguiente, 3000);

    return () => clearInterval(intervalo);

  }, []);

  return (
    
    <div className="carousel">

      <div className="interno" data-indice={indiceActual}>

        {imagenes.map((imagen, indice) => (

          <div className="item" key={indice}>
            <img src={imagen} alt={`Imagen ${indice + 1}`} />
          </div>

        ))}

      </div>

      <button className="button prev" onClick={anterior}>⟨</button>
      <button className="button next" onClick={siguiente}>⟩</button>

    </div>
  );
}





