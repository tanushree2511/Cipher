import { Link } from "react-router-dom";
import "./LandingPage.css"; // Import styles
import doctor1 from "../assets/doctor1.jpg"; // Add doctor images in /src/assets/
import doctor2 from "../assets/doctor2.jpg";
import doctor3 from "../assets/doctor3.jpg";

function LandingPage() {
  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav className="navbar">
        <h2>Doctor’s Assistant</h2>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/dashboard" className="login-btn">Login</Link></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>Empowering Doctors with AI</h1>
        <p>Manage patient records, chat with an AI assistant, and improve healthcare efficiency.</p>
        <Link to="/dashboard" className="btn">Get Started</Link>
      </section>

      {/* Doctors Showcase */}
      <section className="doctors">
        <h2>Meet Our Experts</h2>
        <div className="doctor-list">
          <div className="doctor-card">
            <img src={doctor1} alt="Dr. Smith" />
            <h3>Dr. Alex Smith</h3>
            <p>Cardiologist</p>
          </div>
          <div className="doctor-card">
            <img src={doctor2} alt="Dr. Johnson" />
            <h3>Dr. Emily Johnson</h3>
            <p>Neurologist</p>
          </div>
          <div className="doctor-card">
            <img src={doctor3} alt="Dr. Patel" />
            <h3>Dr. Raj Patel</h3>
            <p>Orthopedic Surgeon</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2025 Doctor’s Assistant. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
