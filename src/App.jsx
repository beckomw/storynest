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
        <p className="hero-tagline">Share your developer journey through storytelling</p>
        <div className="hero-content">
          <p className="hero-description">
            A self-hosted platform for developers to share, discuss, and refine coding projects
            through interactive storytelling. Build community-driven learning within your team or organization.
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
        <p>With a simple setup, you can host your own developer community platform. <code>Fully Customizable!</code></p>
      </div>
    </>
  );
}

export default App;
