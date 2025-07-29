import React from 'react';

const About = () => {
  return (
    <div className="container py-5">
      <div className="card shadow-lg p-4 border-0">
        <div className="row g-4 align-items-center">
          <div className="col-md-6">
            <h2 className="fw-bold mb-3 text-primary">Welcome to iNotebook 📓</h2>
            <p className="text-muted">
              <strong>iNotebook</strong> is your secure, fast, and intelligent note-taking app, built using the MERN stack. Whether you're a student, developer, or professional, iNotebook helps you keep your thoughts, ideas, and important notes organized and accessible.
            </p>
            <ul className="list-unstyled text-muted">
              <li>✅ Create, edit, and delete notes</li>
              <li>✅ All data stored securely with MongoDB</li>
              <li>✅ Instant access from any device</li>
              <li>✅ Login-protected notes just for you</li>
            </ul>
            <p className="text-muted mt-3">
              This project is built using:
              <span className="d-block">🔹 React.js (Frontend)</span>
              <span className="d-block">🔹 Node.js & Express (Backend)</span>
              <span className="d-block">🔹 MongoDB (Database)</span>
            </p>
          </div>

          <div className="col-md-6 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3039/3039389.png"
              alt="Notebook illustration"
              className="img-fluid"
              style={{ maxWidth: '300px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
