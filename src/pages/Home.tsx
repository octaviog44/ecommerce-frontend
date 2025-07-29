
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import '../styles/Home.css';
import type { AxiosResponse, AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/products')
      .then((response: AxiosResponse) => {
        setProducts(response.data || []);
      })
      .catch((error: AxiosError) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="home-container">
      <header className="header">
        <button className="hamburger" onClick={toggleMenu}>☰</button>
        <div className="logo">Compralo</div>
        <form className="search-form" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Buscar" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
        <a href="/signin" className="login-link">Ingresar</a>
      </header>

      {menuOpen && (
        <nav className="mobile-menu open">
          <button className="close-menu" onClick={toggleMenu}>×</button>
          <a href="/">Inicio</a>
          <a href="/profile">Mi perfil</a>
          <a href="/search">Buscar</a>
        </nav>
      )}

      <section className="hero">
        <h1>El mejor e-commerce</h1>
      </section>

      <section className="featured-products">
        <h2>Productos destacados</h2>
        <div className="products-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="product-link">
                <div className="product-card">
                  <img src={product.image} alt={product.title} />
                  <h3>{product.title}</h3>
                  <p className="price">${product.price}</p>
                </div>
              </Link>
            ))
          ) : (
            <p>Cargando productos...</p>
          )}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-left">
          <a href="/">Inicio</a>
          <a href="/profile">Mi perfil</a>
          <a href="/search">Buscar</a>
        </div>
        <div className="footer-right">
          <span>Redes</span>
          <span className="icons">🛒 My e-commerce</span>
        </div>
        <p>&copy; 2025 E-Shop. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Home;
