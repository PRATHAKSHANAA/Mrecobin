import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useNavigate } from "react-router-dom";

    


const SmartBinApp = () => {
    const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const mountRef = useRef(null);
  const sceneRef = useRef(null);

  // Three.js 3D Background Animation
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating geometric shapes
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x22c55e, 
      transparent: true, 
      opacity: 0.6,
      wireframe: true 
    });

    const shapes = [];
    for (let i = 0; i < 15; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      scene.add(mesh);
      shapes.push(mesh);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0x22c55e, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    camera.position.z = 15;
    sceneRef.current = { scene, camera, renderer, shapes };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.002;
        shape.rotation.y += 0.002;
        shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const scrollToSection = (sectionId) => {
    setCurrentSection(sectionId);
    setIsMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields');
      return;
    }
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          line-height: 1.6;
          color: #1f2937;
          overflow-x: hidden;
        }

        .app {
          position: relative;
          min-height: 100vh;
        }

        .three-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          pointer-events: none;
        }

        /* Navbar Styles */
        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          padding: 1rem 2rem;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(34, 197, 94, 0.1);
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        .logo {
          font-size: 1.8rem;
          font-weight: 800;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .logo:hover {
          transform: scale(1.05);
        }

        .nav-links {
          display: flex;
          list-style: none;
          gap: 2rem;
        }

        .nav-link {
          cursor: pointer;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .nav-link:hover {
          background: rgba(34, 197, 94, 0.1);
          color: #16a34a;
          transform: translateY(-2px);
        }

        .nav-actions {
          display: flex;
          gap: 1rem;
        }

        .nav-btn {
          padding: 0.6rem 1.5rem;
          border: none;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .nav-btn.login {
          background: transparent;
          color: #22c55e;
          border: 2px solid #22c55e;
        }

        .nav-btn.signup {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          border: 2px solid transparent;
        }

        .nav-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(34, 197, 94, 0.3);
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }

        /* Section Styles */
        .section {
          min-height: 100vh;
          padding: 6rem 2rem 4rem;
          position: relative;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-title {
          font-size: 3rem;
          font-weight: 800;
          text-align: center;
          margin-bottom: 3rem;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Home Section */
        .home-section {
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.05), rgba(22, 163, 74, 0.1));
          position: relative;
        }

        .home-card {
          text-align: center;
          padding: 4rem;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          box-shadow: 0 25px 50px rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.2);
          max-width: 600px;
          animation: fadeInUp 1s ease-out;
        }

        .home-title {
          font-size: 3.5rem;
          font-weight: 900;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1.2;
        }

        .home-subtitle {
          font-size: 1.3rem;
          color: #6b7280;
          margin-bottom: 2.5rem;
          line-height: 1.6;
        }

        .cta-btn {
          padding: 1rem 2.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(34, 197, 94, 0.3);
        }

        .cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(34, 197, 94, 0.4);
        }

        /* About Section */
        .about-section {
          background: #f8fafc;
        }

        .about-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          margin-bottom: 4rem;
        }

        .about-text {
          font-size: 1.1rem;
          color: #4b5563;
          line-height: 1.8;
        }

        .about-text p {
          margin-bottom: 1.5rem;
        }

        .about-image {
          text-align: center;
        }

        .about-image img {
          max-width: 100%;
          height: auto;
          border-radius: 15px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .about-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .card {
          background: white;
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.1);
          transition: all 0.3s ease;
          text-align: center;
        }

        .card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 50px rgba(34, 197, 94, 0.15);
        }

        .card h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #22c55e;
          margin-bottom: 1rem;
        }

        .card p {
          color: #6b7280;
          line-height: 1.6;
        }

        /* Contact Section */
        .contact-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .info-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.1);
          transition: transform 0.3s ease;
        }

        .info-card:hover {
          transform: translateX(10px);
        }

        .info-card h3 {
          color: #22c55e;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .contact-form {
          background: white;
          padding: 2.5rem;
          border-radius: 15px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #f9fafb;
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #22c55e;
          background: white;
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
        }

        .form-textarea {
          min-height: 120px;
          resize: vertical;
        }

        .submit-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(34, 197, 94, 0.3);
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeInUp 0.8s ease-out;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
          }

          .section {
            padding: 4rem 1rem 2rem;
          }

          .home-title {
            font-size: 2.5rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .about-container,
          .contact-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .about-cards {
            grid-template-columns: 1fr;
          }

          .nav-actions {
            gap: 0.5rem;
          }

          .nav-btn {
            padding: 0.5rem 1rem;
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .navbar {
            padding: 1rem;
          }

          .home-card {
            padding: 2rem;
            margin: 1rem;
          }

          .home-title {
            font-size: 2rem;
          }

          .home-subtitle {
            font-size: 1rem;
          }
        }
      `}</style>

      <div ref={mountRef} className="three-bg" />

      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-container">
          <h2 className="logo" onClick={() => scrollToSection('home')}>
            SmartBin
          </h2>
          <ul className="nav-links">
            <li className="nav-link" onClick={() => scrollToSection('home')}>Home</li>
            <li className="nav-link" onClick={() => scrollToSection('about')}>About</li>
            <li className="nav-link" onClick={() => scrollToSection('contact')}>Contact</li>
          </ul>
          <div className="nav-actions">
          <button className="nav-btn" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="nav-btn signup" onClick={() => navigate("/signup")}>
          Signup
        </button>
          </div>
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="section home-section">
        <div className="container">
          <div className="home-card">
            <h1 className="home-title">Welcome to SmartBin</h1>
            <p className="home-subtitle">
              Revolutionary waste management solution using IoT & AI technology. 
              Monitor bin levels, optimize collection routes, and keep your city clean with intelligent automation.
            </p>
            <button className="cta-btn" onClick={() => scrollToSection('about')}>
              Discover More
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="container">
          <h2 className="section-title">About SmartBin</h2>
          
          <div className="about-container">
            <div className="about-text">
              <p>
                SmartBin represents the future of waste management, combining cutting-edge IoT sensors with advanced AI algorithms to create a comprehensive solution for modern cities. Our innovative platform transforms traditional waste collection into an intelligent, data-driven process.
              </p>
              <p>
                Through real-time monitoring and predictive analytics, we help municipalities reduce operational costs, minimize environmental impact, and enhance urban cleanliness. Our mission extends beyond technology – we're building sustainable communities for future generations.
              </p>
            </div>
            <div className="about-image">
              <div style={{
                width: '100%',
                height: '300px',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.2rem',
                fontWeight: '600'
              }}>
                Smart Technology Visualization
              </div>
            </div>
          </div>

          <div className="about-cards">
            <div className="card animate-fade-in">
              <h3>Our Mission</h3>
              <p>
                Revolutionize urban waste management through intelligent IoT solutions, 
                reducing overflow incidents and optimizing collection efficiency for cleaner cities.
              </p>
            </div>
            <div className="card animate-fade-in">
              <h3>Our Vision</h3>
              <p>
                Create a sustainable future where smart technology enables zero-waste cities, 
                promoting environmental responsibility and community well-being.
              </p>
            </div>
            <div className="card animate-fade-in">
              <h3>Our Values</h3>
              <p>
                Innovation drives us, sustainability guides us, and community impact motivates us 
                to deliver exceptional smart city solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <h2 className="section-title">Contact Us</h2>
          
          <div className="contact-container">
            <div className="contact-info">
              <div className="info-card">
                <h3>📍 Address</h3>
                <p>123 Green Technology Hub<br/>Smart City Innovation District<br/>Chennai, Tamil Nadu 600001</p>
              </div>
              <div className="info-card">
                <h3>📧 Email</h3>
                <p>hello@smartbin.com<br/>support@smartbin.com</p>
              </div>
              <div className="info-card">
                <h3>📞 Phone</h3>
                <p>+91 98765 43210<br/>+91 87654 32109</p>
              </div>
            </div>

            <div className="contact-form">
              <div>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Your Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    className="form-textarea"
                    placeholder="Tell us about your project or ask any questions..."
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>
                <button 
                  type="button" 
                  className="submit-btn"
                  onClick={handleFormSubmit}
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SmartBinApp;