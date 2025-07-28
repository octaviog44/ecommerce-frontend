
import { useEffect, useState } from 'react'
import { api } from '../api'
import { Link } from 'react-router-dom'
import '../styles/Home.css'

interface Product {
  id: string
  name: string
  price: number
  image: string
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    api.get('/products').then(res => {
      setProducts(res.data)
    })
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = `/search?q=${searchQuery}`
  }

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="logo-container">
          <Link to="/" className="logo">🛒 Compralo</Link>
          <div className="mobile-menu-button">☰</div>
        </div>
        <div className="header-right">
          <Link to="/signin" className="signin-button">Ingresar</Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <h1>El mejor<br />e-commerce</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input 
            type="text" 
            placeholder="Buscar" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">Buscar</button>
        </form>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <h2>Productos destacados</h2>
        <div className="products-grid">
          {products.slice(0, 4).map(product => (
            <Link to={`/item/${product.id}`} key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-price">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <div className="footer-column">
            <h4>Enlaces</h4>
            <Link to="/">Inicio</Link>
            <Link to="/signin">Mi perfil</Link>
            <Link to="/">Buscar</Link>
            <Link to="/">Contacto</Link>
          </div>
          <div className="footer-column">
            <h4>Redes</h4>
            <a href="#">🌐 Mi E-Commerce</a>
            <a href="#">📱 Mi E-Commerce</a>
          </div>
        </div>
        <div className="copyright">
          © 2023 Aio
        </div>
      </footer>
    </div>
  )
}
