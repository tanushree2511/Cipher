import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import PatientDetails from "./pages/PatientDetails";
import Chatbot from "./pages/Chatbot";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<PatientDetails />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
