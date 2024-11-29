import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter } from 'react-router-dom';
import ProveedorAutenticacion from './components/ContextoAutenticacion';
import ProveedorCarrito from './components/ContextoCarrito';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <ProveedorAutenticacion>
                <ProveedorCarrito>
                    <App />
                </ProveedorCarrito>
            </ProveedorAutenticacion>
        </BrowserRouter>
    </StrictMode>
);
