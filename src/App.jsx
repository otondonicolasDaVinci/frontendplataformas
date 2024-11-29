import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Catalogo from './components/Catalogo';
import Carrito from './components/Carrito';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import AbmProductos from './components/AbmProductos'; // Importa el JSX
import AbmUsuarios from './components/AbmUsuarios'; // Importa el JSX
import './styles/styles.css';

export default function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/abm-productos" element={<AbmProductos />} />
                <Route path="/abm-usuarios" element={<AbmUsuarios />} />
            </Routes>
            <Footer />
        </>
    );
}
