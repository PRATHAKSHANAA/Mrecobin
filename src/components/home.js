// import React from "react";
// import '../App.css';

// const Home = () => {
//   return (
//     <section className="section">
//       <h1>Welcome to SmartBin 🚮</h1>
//       <p>
//         SmartBin is an innovative waste management solution using IoT & AI.
//         Monitor bin levels, optimize collection routes, and keep your city clean!
//       </p>
//     </section>
//   );
// };

// export default Home;
// Home.js
import React from "react";
import "../App.css";

const Home = () => {
  return (
    <section id="home" className="home-section">
      <div className="home-card">
        <h1>Welcome to SmartBin </h1>
        <p>
          SmartBin is an innovative waste management solution using IoT & AI.
          Monitor bin levels, optimize collection routes, and keep your city clean!
        </p>
        <button className="home-btn">Get Started</button>
      </div>
    </section>
  );
};

export default Home;
