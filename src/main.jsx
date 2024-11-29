import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter } from 'react-router-dom';
import CartProvider from './components/ContextoCarrito';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);