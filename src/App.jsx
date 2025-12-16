import './App.css';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <div className="container" style={{ padding: '25px' }}></div>

      <div className="px-4 py-5 my-5 text-center">
        <img
          src="/assets/storynest.png"
          alt="StoryNest Logo"
          width="300"
          height="300"
          style={{
            borderRadius: '20px',
            boxShadow: '0px 20px 20px rgba(0, 0, 0, 0.2)'
          }}
        />
        <h1 className="display-5 fw-bold text-body-emphasis">StoryNest</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            StoryNest is a locally hosted platform designed for developers to share, discuss,
            and refine their coding projects through interactive storytelling. The app addresses
            the need for community-driven learning and problem-solving within smaller, private
            networks or organizations. By allowing users to create, tag, and interact with stories,
            StoryNest fosters a supportive environment where developers can connect, learn from
            one another, and gain feedback on their work.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/stories" className="btn btn-primary btn-lg px-4 gap-3">
              Get Started
            </Link>
            <Link to="/documentation" className="btn btn-outline-secondary btn-lg px-4">
              Documentation
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
