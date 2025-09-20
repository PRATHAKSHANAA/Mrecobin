// import React from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import '../App.css';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const scrollToSection = (id) => {
//     if (location.pathname !== "/") {
//       navigate("/");
//       setTimeout(() => {
//         document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
//       }, 100);
//     } else {
//       document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <nav className="navbar">
//       <h2 className="logo" onClick={() => navigate("/")}>SmartBin</h2>
//       <ul className="nav-links">
//         <li onClick={() => scrollToSection("home")}>Home</li>
//         <li onClick={() => scrollToSection("about")}>About</li>
//         <li onClick={() => scrollToSection("contact")}>Contact</li>
//       </ul>
//       <div className="nav-actions">
//         <button className="nav-btn" onClick={() => navigate("/login")}>Login</button>
//         <button className="nav-btn signup" onClick={() => navigate("/signup")}>Signup</button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      <h2 className="logo" onClick={() => scrollToSection("home")}>
        SmartBin
      </h2>
      <ul className="nav-links">
        <li onClick={() => scrollToSection("home")}>Home</li>
        <li onClick={() => scrollToSection("about")}>About</li>
        <li onClick={() => scrollToSection("contact")}>Contact</li>
      </ul>
      <div className="nav-actions">
        <button className="nav-btn" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="nav-btn signup" onClick={() => navigate("/signup")}>
          Signup
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
