import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact  path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;