import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../api';
import '../styles/Home.css'; // Reutiliza estilos
import type { AxiosResponse, AxiosError } from 'axios';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState(query);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    api.get('/products')
      .then((response: AxiosResponse<Product[]>) => {
        const data = response.data || [];
        setProducts(data);
        const results = data.filter(product => product.title.toLowerCase().includes(query.toLowerCase()));
        setFilteredProducts(results);
      })
      .catch((error: AxiosError) => {
        console.error('Error fetching products:', error);
      });
  }, [query]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const results = products.filter(product => product.title.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredProducts(results);
  };

  const toggleMenu = () => {
    console.log('Toggle menu called, current state:', menuOpen);
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="home-container">
      <header className="header">
        <button className="hamburger" onClick={toggleMenu}>☰</button>
        <div className="logo">Compralo</div>
        <form className="search-form" onSubmit={handleSearch}>
          <input type="text" placeholder="Buscar" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
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

      <section className="featured-products">
        <h2>Productos encontrados</h2>
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="product-link">
                <div className="product-card">
                  <img src={product.image} alt={product.title} />
                  <h3>{product.title}</h3>
                  <p className="price">${product.price}</p>
                  <button className="add-to-cart">Agregar al carrito</button>
                </div>
              </Link>
            ))
          ) : (
            <p>No se encontraron productos.</p>
          )}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-left">
          <a href="/signin">Login</a>
          <a href="/profile">Mi perfil</a>
          <a href="/search">Buscar</a>
        </div>
        <div className="footer-right">
          <span>Redes</span>
          <span className="icons">🛒 My e-commerce</span>
        </div>
        <p>&copy; 2023 E-Shop. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default SearchResults;