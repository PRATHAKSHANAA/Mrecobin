// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // Landing page
// import Navbar from "./components/navbar";
// import Home from "./components/home";
// import About from "./components/about";
// import Contact from "./components/contact";

// // Auth pages
// import Login from "./pages/login";
// import Signup from "./pages/signup";
// import CitizenPage from "./pages/citizen";
// import MuniciplePage from "./pages/municiple";


// // Dashboard page
// // import DashboardPage from "./pages/dashboard";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Landing page */}
//         <Route
//           path="/"
//           element={
//             <>
//               <Navbar />
//               <div id="home"><Home /></div>
//               <div id="about"><About /></div>
//               <div id="contact"><Contact /></div>
//             </>
//           }
//         />

//         {/* Auth pages */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Citizen Dashboard */}
//         {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
//         <Route path="/dashboard" element={<CitizenPage />} /> 
//         <Route path="/municipal-dashboard" element={<MuniciplePage/>} /> 
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Landing page components
// import Navbar from "./components/navbar";
// import Home from "./components/home";
// import About from "./components/about";
// import Contact from "./components/contact";

// Auth pages
import SmartBinApp from "./pages/hom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import CitizenPage from "./pages/citizen";
import MuniciplePage from "./pages/municiple";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // GSAP animations for sections
    gsap.utils.toArray(".section").forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, []);

  return (
    <Router>
      <Routes>
        
        {/* <Route
          path="/"
          element={
            <>
              <Navbar />
              <div id="home" className="section">
                <Home />
              </div>
              <div id="about" className="section">
                <About />
              </div>
              <div id="contact" className="section">
                <Contact />
              </div>
            </>
          }
        /> */}

        <Route path="/" element={<SmartBinApp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

     
        <Route path="/dashboard" element={<CitizenPage />} />
        <Route path="/municipal-dashboard" element={<MuniciplePage />} />
      </Routes>
    </Router>
  );
}

export default App;
