import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Landing page
import Navbar from "./components/navbar";
import Home from "./components/home";
import About from "./components/about";
import Contact from "./components/contact";

// Auth pages
import Login from "./pages/login";
import Signup from "./pages/signup";

// Dashboard page
import DashboardPage from "./pages/dashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <div id="home"><Home /></div>
              <div id="about"><About /></div>
              <div id="contact"><Contact /></div>
            </>
          }
        />

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Citizen Dashboard */}
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
