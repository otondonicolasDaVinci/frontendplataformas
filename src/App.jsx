import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Catalogo from './components/Catalogo';
import Carrito from './components/Carrito';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
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
      </Routes>
      <Footer />
    </>
  );
}
