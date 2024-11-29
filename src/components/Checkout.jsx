import { useState } from 'react';

export default function Checkout() {
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [fechaCaducidad, setFechaCaducidad] = useState('');
  const [codigoSeguridad, setCodigoSeguridad] = useState('');
  const [altura, setAltura] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);


  const soloNumeros = (valor) => valor.replace(/\D/g, '');

  const formatearNumeroTarjeta = (e) => {
    setNumeroTarjeta(soloNumeros(e.target.value)
      .replace(/(.{4})/g, '$1 ')
      .trim()
    );
  };

  const formatearFechaCaducidad = (e) => {
    setFechaCaducidad(
      soloNumeros(e.target.value)
      .replace(/(\d{2})/, '$1/')
    );
  };

  const formatearCodigoSeguridad = (e) => {
    setCodigoSeguridad(soloNumeros(e.target.value));
  };

  const formatearAltura = (e) => {
    setAltura(soloNumeros(e.target.value));
  };

  const formatearCodigoPostal = (e) => {
    setCodigoPostal(soloNumeros(e.target.value));
  };

  const enviarFormulario = (e) => {
    e.preventDefault();
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  return (
    <div className="checkout">
      <h2>Proceso de Pago</h2>
      <form onSubmit={enviarFormulario}>
        <label>
          Número de Tarjeta:
          <input type="text" value={numeroTarjeta}onChange={formatearNumeroTarjeta} maxLength="19" placeholder="1234 5678 9012 3456" required/>
        </label>

        <div className="row">
          <label>
            Fecha de Caducidad:
            <input type="text" value={fechaCaducidad} onChange={formatearFechaCaducidad} maxLength="5" placeholder="MM/AA" required/>
          </label>

          <label>
            Código de Seguridad:
            <input type="text" value={codigoSeguridad} onChange={formatearCodigoSeguridad} maxLength="3" placeholder="123" required/>
          </label>
        </div>

        <h3>Dirección de Envío</h3>
        <label>
          Calle:
          <input type="text" required />
        </label>

        <div className="row">
          <label>
            Altura:
            <input type="text" value={altura} onChange={formatearAltura} required/>
          </label>
          <label>
            Piso:
            <input type="text"/>
          </label>
          <label>
            Unidad:
            <input type="text"/>
          </label>
        </div>

        <label>
          Provincia:
          <select required>
            <option value="">Seleccione una provincia</option>
            {[
              'Buenos Aires',
              'CABA',
              'Catamarca',
              'Chaco',
              'Chubut',
              'Córdoba',
              'Corrientes',
              'Entre Ríos',
              'Formosa',
              'Jujuy',
              'La Pampa',
              'La Rioja',
              'Mendoza',
              'Misiones',
              'Neuquén',
              'Río Negro',
              'Salta',
              'San Juan',
              'San Luis',
              'Santa Cruz',
              'Santa Fe',
              'Santiago del Estero',
              'Tierra del Fuego',
              'Tucumán',
            ].map((provincia) => (
              <option key={provincia} value={provincia}>
                {provincia}
              </option>
            ))}
          </select>
        </label>

        <label>
          Código Postal:
          <input type="text" value={codigoPostal} onChange={formatearCodigoPostal} required/>
        </label>

        <label>
          Detalles:
          <input type="text" placeholder="Casa con techo verde y paredes amarillas"/>
        </label>

        <button type="submit">
          Finalizar Compra
        </button>
      </form>

      {mostrarModal && (
        <div className="modal">
          <div className="contenido">
            <h2>Compra Exitosa!</h2>
            <p>Gracias por tu compra. Recibirás un correo de confirmación pronto.</p>
            <button className="boton-cerrar" onClick={cerrarModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

