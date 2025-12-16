import './App.css';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <div className="container" style={{ padding: '25px' }}></div>

      <div className="hero-section">
        <img
          src="/assets/storynest.png"
          alt="StoryNest Logo"
          className="hero-logo"
        />
        <h1 className="hero-title">StoryNest</h1>
        <p className="hero-tagline">Document. Debug. Deploy. Discuss.</p>
        <div className="hero-content">
          <p className="hero-description">
            A self-hosted knowledge base for engineering teams. Share architecture decisions,
            post-mortems, code walkthroughs, and technical deep-dives. Built for devs who ship.
          </p>
          <div className="hero-buttons">
            <Link to="/stories" className="btn-hero btn-hero-primary">
              Get Started
            </Link>
            <Link to="/documentation" className="btn-hero btn-hero-secondary">
              View Docs
            </Link>
          </div>
        </div>
      </div>

      <div className="features-section">
        <p><code>npm install</code> &rarr; <code>docker-compose up</code> &rarr; Ship internal docs in minutes.</p>
      </div>
    </>
  );
}

export default App;
