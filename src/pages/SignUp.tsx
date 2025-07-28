import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function SignUp() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ fullName, phone, email });
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
        <h1>Registrarse</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre completo:</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>
          <div>
            <label>Teléfono:</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <button type="submit">Registrarse</button>
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

export default SignUp;