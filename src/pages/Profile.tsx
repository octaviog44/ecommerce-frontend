import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Profile() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInEmail = localStorage.getItem('loggedInEmail');
    if (loggedInEmail) {
      const storedData = localStorage.getItem('userData');
      if (storedData) {
        const userData = JSON.parse(storedData);
        if (userData.email === loggedInEmail) {
          setFullName(userData.fullName);
          setPhone(userData.phone);
          setEmail(userData.email);
        } else {
          // Email no coincide, posible error
          navigate('/signin');
        }
      } else {
        navigate('/signin');
      }
    } else {
      navigate('/signin');
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica para guardar cambios (puedes integrar con API)
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
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
        <a href="/signin" className="login-link">Ingresar</a>
      </header>

      <nav className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button className="close-menu" onClick={toggleMenu}>×</button>
        <a href="/">Inicio</a>
        <a href="/profile">Mi perfil</a>
        <a href="/search">Buscar</a>
        <a href="/signin">Login</a>
      </nav>

      <section className="profile-form">
        <h1>Perfil</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre completo:</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Teléfono:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Guardar</button>
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
        <p>&copy; 2025 E-Shop. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
  // En el JSX, los inputs usarán los states cargados
}

export default Profile;
  