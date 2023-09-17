import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';

function App() {
  // State for managing alerts
  const [alert, setAlert] = useState(null);

  // Function to display alerts
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => {
      setAlert(null);
    }, 3000); // Hide the alert after 3 seconds
  };

  return (
    // Wrap the entire app with NoteState to provide context
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Alert alert={alert} />
        <div className='container my-4'>
          <Routes>
            {/* Route for the home page */}
            <Route exact path='/' element={<Home showAlert={showAlert} />} />
            
            {/* Route for the about page */}
            <Route exact path='/about' element={<About />} />
            
            {/* Route for the login page */}
            <Route exact path='/login' element={<Login showAlert={showAlert} />} />
            
            {/* Route for the signup page */}
            <Route exact path='/signup' element={<Signup showAlert={showAlert} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;