import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import '../styles/ItemDetail.css';
import type { AxiosResponse, AxiosError } from 'axios';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string; // Asumiendo que la API devuelve una descripción
}

function ItemDetail() {
  const { id } = useParams<{ id: string }>(); 
  const [product, setProduct] = useState<Product | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then((response: AxiosResponse) => {
        setProduct(response.data);
      })
      .catch((error: AxiosError) => {
        console.error('Error fetching product details:', error);
      });
  }, [id]);

  if (!product) {
    return <p>Cargando detalles del producto...</p>;
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="item-detail-container">
      <header className="header">
        <button className="hamburger" onClick={toggleMenu}>☰</button>
        <div className="logo">Compralo</div>
        <form className="search-form">
          <input type="text" placeholder="Buscar" />
          <button type="submit">Buscar</button>
        </form>
        <a href="/signin" className="login-link">Ingresar</a>
      </header>

      {menuOpen && (
        <nav className="mobile-menu">
          <button className="close-menu" onClick={toggleMenu}>×</button>
          <a href="/">Inicio</a>
          <a href="/profile">Mi perfil</a>
          <a href="/signin">Ingresar</a>
        </nav>
      )}

      <main className="product-section">
        <img src={product.image} alt={product.title} className="product-image" />
        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="price">${product.price} <button className="buy-button">Comprar</button></p>
          <p className="description">{product.description}</p>
        </div>
      </main>

      <footer className="footer">
        <a href="/profile">Mi perfil</a>
        <div className="social">
          <span>Redes</span>
          <span className="icons">🛒 My e-commerce</span>
        </div>
      </footer>
    </div>
  );
}

export default ItemDetail;