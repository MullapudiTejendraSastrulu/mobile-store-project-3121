import { useNavigate } from 'react-router-dom'
import './Home.css'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <nav className="home-nav">
        <div className="logo">📱 MobileStore</div>
        <div className="nav-links">
          <button onClick={() => navigate('/login')} className="btn-outline">Login</button>
          <button onClick={() => navigate('/register')} className="btn-primary">Register</button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-badge">🚀 Premium Mobile Store</div>
        <h1>Discover the <span className="gradient-text">Latest Mobiles</span></h1>
        <p>Browse top brands, compare specs, and find your perfect smartphone at the best prices.</p>
        <div className="hero-actions">
          <button onClick={() => navigate('/register')} className="btn-primary btn-lg">Get Started</button>
          <button onClick={() => navigate('/login')} className="btn-outline btn-lg">Sign In</button>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">📦</div>
          <h3>Wide Collection</h3>
          <p>Explore hundreds of mobile models from top brands worldwide.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💰</div>
          <h3>Best Prices</h3>
          <p>Get competitive pricing with real-time updates on all devices.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Secure Platform</h3>
          <p>JWT-secured accounts keep your data safe and private.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Fast & Reliable</h3>
          <p>Powered by Spring Boot for a seamless, high-performance experience.</p>
        </div>
      </section>

      <footer className="home-footer">
        <p>© 2025 MobileStore · Built with React & Spring Boot</p>
      </footer>
    </div>
  )
}
