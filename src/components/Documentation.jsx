import Navbar from './Navbar.jsx';
import './Documentation.css';

function Documentation() {
    return (
      <>
        <Navbar />

        <div className="documentation-container">
          <header className="doc-header">
            <h1>StoryNest Documentation</h1>
            <p>Learn how to use StoryNest to share and collaborate on developer stories.</p>
          </header>

          <section id="introduction" className="doc-section">
            <h2>Introduction</h2>
            <p>
              StoryNest is a locally hosted platform designed for developers to share, discuss,
              and refine their coding projects through interactive storytelling. The platform
              fosters community-driven learning and problem-solving within smaller, private
              networks or organizations.
            </p>
          </section>

          <section id="features" className="doc-section">
            <h2>Features</h2>
            <div className="feature-grid">
              <div className="feature-card">
                <h3>User Authentication</h3>
                <p>Secure login via Auth0 with support for social providers and email authentication.</p>
              </div>
              <div className="feature-card">
                <h3>Story Creation</h3>
                <p>Create, edit, and publish stories with rich content to share your development journey.</p>
              </div>
              <div className="feature-card">
                <h3>Comments & Reactions</h3>
                <p>Engage with stories through comments and reactions (likes/dislikes) to provide feedback.</p>
              </div>
              <div className="feature-card">
                <h3>Story Feed</h3>
                <p>Browse and discover stories from the community in a clean, organized feed.</p>
              </div>
            </div>
          </section>

          <section id="getting-started" className="doc-section">
            <h2>Getting Started</h2>
            <ol className="steps-list">
              <li>
                <strong>Sign In:</strong> Click the Login button in the navigation bar to authenticate with your account.
              </li>
              <li>
                <strong>Browse Stories:</strong> Navigate to the Stories page to view content from the community.
              </li>
              <li>
                <strong>Create a Story:</strong> Click "Create" to write and publish your own story.
              </li>
              <li>
                <strong>Engage:</strong> Like, dislike, and comment on stories to participate in discussions.
              </li>
            </ol>
          </section>

          <section id="usage" className="doc-section">
            <h2>Usage Guide</h2>

            <h3>Creating a Story</h3>
            <ol className="steps-list">
              <li>Navigate to the Stories page and click the "Create Story" button.</li>
              <li>Enter a title that describes your story.</li>
              <li>Write your content in the story body field.</li>
              <li>Add relevant tags to help others discover your story.</li>
              <li>Click "Submit" to publish your story.</li>
            </ol>

            <h3>Interacting with Stories</h3>
            <ul className="steps-list">
              <li><strong>View:</strong> Click on any story card to read the full content.</li>
              <li><strong>React:</strong> Use the thumbs up/down buttons to express your opinion.</li>
              <li><strong>Comment:</strong> Scroll to the comments section to add your thoughts.</li>
              <li><strong>Edit:</strong> If you're the author, use the edit button to modify your story.</li>
            </ul>
          </section>

          <section id="api" className="doc-section">
            <h2>API Reference</h2>
            <p>StoryNest provides a RESTful API for all operations:</p>
            <div className="api-table">
              <table>
                <thead>
                  <tr>
                    <th>Endpoint</th>
                    <th>Method</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>/api/stories/</code></td>
                    <td>GET</td>
                    <td>Retrieve all stories</td>
                  </tr>
                  <tr>
                    <td><code>/api/stories/</code></td>
                    <td>POST</td>
                    <td>Create a new story</td>
                  </tr>
                  <tr>
                    <td><code>/api/stories/{'{id}'}/</code></td>
                    <td>GET</td>
                    <td>Retrieve a specific story</td>
                  </tr>
                  <tr>
                    <td><code>/api/stories/{'{id}'}/</code></td>
                    <td>PUT</td>
                    <td>Update a story</td>
                  </tr>
                  <tr>
                    <td><code>/api/stories/{'{id}'}/</code></td>
                    <td>DELETE</td>
                    <td>Delete a story</td>
                  </tr>
                  <tr>
                    <td><code>/api/stories/{'{story_id}'}/comments/</code></td>
                    <td>GET/POST</td>
                    <td>Manage story comments</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <footer className="doc-footer">
            <p>Created by Jay Yong & Wayne Beckom</p>
          </footer>
        </div>
      </>
    );
  }

export default Documentation;
