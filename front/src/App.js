import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import KnowledgeBase from './components/pages/KnowledgeBase';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact  path="/" element={<Home />} />
        <Route exact path="/expert/base de connaissances" element={<KnowledgeBase />} />
      </Routes>
    </Router>
  );
}

export default App;