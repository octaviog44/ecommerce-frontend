import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function SignIn() {
  const [code, setCode] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica de login con código
    console.log({ code });
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="home-container">
      <header className="header">
        <button className="hamburger" onClick={toggleMenu}>☰</button>
        <div className="logo">Compralo</div>
        <form className="search-form" onSubmit={handleSearch}>
          <input type="text" placeholder="Buscar productos..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <button type="submit">Buscar</button>
        </form>
        <div className="auth-links">
          <a href="/signup">Registrarse</a>
          <a href="/signin">Ingresar</a>
        </div>
      </header>

      {menuOpen && (
        <nav className="mobile-menu open">
          <button className="close-menu" onClick={toggleMenu}>×</button>
          <a href="/">Inicio</a>
          <a href="/profile">Mi perfil</a>
          <a href="/search">Buscar</a>
        </nav>
      )}

      <section className="signin-form">
        <h1>Ingresar</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Código:</label>
            <input type="text" value={code} onChange={(e) => setCode(e.target.value)} required />
          </div>
          <button type="submit">Ingresar</button>
        </form>
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

export default SignIn;
  