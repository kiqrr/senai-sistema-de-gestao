import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          {/* Adicione outras rotas aqui conforme necessário */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
