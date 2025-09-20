// import React from "react";
// import '../App.css';

// const Contact = () => {
//   return (
//     <section className="section">
//       <h1>Contact Us</h1>
//       <p>Team Name: SmartBin Innovators</p>
//       <p>📞 +91 98765 43210</p>
//       <p>📧 smartbin@project.com</p>
//       <p>📸 Instagram: <a href="https://instagram.com/smartbin" target="_blank" rel="noreferrer">@smartbin</a></p>
//     </section>
//   );
// };

// export default Contact;
import React from "react";
import "../App.css";

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">Contact Us</h2>

      <div className="contact-container">
        <div className="contact-info">
          <div className="info-card">
            <h3>Address</h3>
            <p>123 Green Street, Clean City, CC 600001</p>
          </div>
          <div className="info-card">
            <h3>Email</h3>
            <p>support@smartbin.com</p>
          </div>
          <div className="info-card">
            <h3>Phone</h3>
            <p>+91 98765 43210</p>
          </div>
        </div>

        <div className="contact-form">
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Email Address" required />
            <textarea placeholder="Your Message" rows="5" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
