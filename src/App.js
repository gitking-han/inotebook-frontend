import './App.css';
import './sidebar.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useCallback } from 'react';

import AddNote from './components/addnote';
import Notes from './components/notes';
import Sidebar from './components/sidebar';
import NoteState from './context/NoteState';
import Alert from './components/alert';
import Signup from './components/signup';
import Login from './components/login';
import About from './components/about';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@coreui/icons/css/all.min.css'; // Required for icons like cil-notes, cil-user-follow, etc.


function App() { 
  const [alert, setAlert] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => setAlert(null), 1500);
  };

  const handleSidebarClose = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <NoteState>
      <BrowserRouter>
        {/* Toggle Button */}
        <button
          className="btn btn-primary position-fixed top-0 start-0 m-3 z-3 d-md-none"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>

        <div className="d-flex" style={{ minHeight: '100vh' }}>
          {/* Sidebar wrapper */}
          <div className={`sidebar-wrapper ${sidebarOpen ? 'active' : ''}`}>
            <Sidebar onClose={handleSidebarClose} />
          </div>

          {/* Content */}
          <div className="flex-grow-1 p-3">
            <Alert alert={alert} />
            <Routes>
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/signup" element={<Signup showAlert={showAlert} />} />
              <Route path="/addnote" element={<AddNote showAlert={showAlert} />} />
              <Route path="/notes" element={<Notes showAlert={showAlert} />} />
              <Route path="/" element={<About showAlert={showAlert} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
