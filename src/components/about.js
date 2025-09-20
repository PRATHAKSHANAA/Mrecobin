// import React from "react";
// import '../App.css';

// const About = () => {
//   return (
//     <section className="section">
//       <h1>About the Project</h1>
//       <p>
//         Our project is designed to make waste management smarter by notifying
//         municipal workers when bins are full and encouraging citizens to
//         segregate waste. This improves efficiency, reduces overflow, and
//         promotes a cleaner environment.
//       </p>
//     </section>
//   );
// };


import React from "react";
import "../App.css";

const About = () => {
  return (
    <section id="about" className="about-section">
      <h2 className="section-title">About SmartBin</h2>
      
      <div className="about-container">
        <div className="about-text">
          <p>
            SmartBin is an innovative waste management solution that leverages IoT
            sensors and AI technology to optimize waste collection, reduce overflow,
            and keep our cities clean.
          </p>
          <p>
            Our mission is to simplify waste management and promote environmental
            sustainability with smart technology.
          </p>
        </div>

        <div className="about-image">
        <img src="/Volunteering-bro.png" alt="Volunteering" />

        </div>
      </div>

      <div className="about-cards">
        <div className="card">
          <h3>Our Mission</h3>
          <p>Reduce waste overflow using smart IoT-enabled bins.</p>
        </div>
        <div className="card">
          <h3>Our Vision</h3>
          <p>Enable cleaner, smarter, and more sustainable cities.</p>
        </div>
        <div className="card">
          <h3>Our Values</h3>
          <p>Innovation, sustainability, and community impact.</p>
        </div>
      </div>
    </section>
  );
};

export default About;

