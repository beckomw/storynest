

import Navbar from './Navbar.jsx';



function Documentation() {
    return (
      <>
           
        <Navbar />

        <section id="introduction">
            <h2>StoryNest App</h2>
            <p>Welcome to the documentation for [Your App Name]. This document provides an overview of the app, its features, and how to get started.</p>
        </section>

        <section id="features">
            <h2>Features</h2>
            <div className="card">
                <h3>Feature 1</h3>
                <p>Description</p>
            </div>
            <div className="card">
                <h3>Feature 2</h3>
                <p>Description</p>
            </div>
            <div className="card">
                <h3>Feature 3</h3>
                <p>Description</p>
            </div>
        </section>

        <section id="installation">
            <h2>Installation</h2>
            <p>Follow these steps to install [Your App Name]:</p>
            <ol>
                <li>Step 1: Description</li>
                <li>Step 2: Description</li>
                <li>Step 3: Description</li>
            </ol>
        </section>

        <section id="usage">
            <h2>Usage</h2>
            <p>To use [Your App Name], follow these instructions:</p>
            <ol>
                <li>Step 1: Description</li>
                <li>Step 2: Description</li>
                <li>Step 3: Description</li>
            </ol>
        </section>


        <div className="container" style={{ padding: '799px' }}></div>





      </>
    );
  }
  
  export default Documentation;