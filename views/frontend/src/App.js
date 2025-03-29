// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";  // Importa el componente Login
import Home from "./pages/Home";  // Importa el componente Login

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Ruta para la página de login */}
        <Route path="/dashboard" element={<Home />} /> {/* Ruta para la página Home o Dashboard */}
      </Routes>
    </Router>
  );
};

export default App;
