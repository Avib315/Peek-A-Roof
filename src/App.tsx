import './App.scss';
import Header from './component/Header';
import Button from './component/Button';
import ImagesBrowser from './component/ImagesBrowser';
import VideoDisplay from './component/VideoDisplay';
import ContactUs from './component/ContactUs';
import { useTranslationStore } from './stores/useTranslationStore';
import { useEffect } from 'react';

function App() {
  const { translations, isEnglish } = useTranslationStore();

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleCallClick = () => {
    window.location.href = 'tel:+972501234567';
  };

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app">
      <Header />

      <section id="home" className="hero-section">
        <div className="hero-video-container">
          <VideoDisplay />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content fade-in">
          <h1 className="hero-title">{translations.title}</h1>
          <h2 className="hero-subtitle">{translations.secondTitle}</h2>
          <div className="hero-buttons">
            <button className="btn btn-secondary" onClick={handleContactClick}>
              {translations.getQuote}
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section fade-in">
        <div className="container">
          <div className="about-content">
            <h2 className="section-title">{translations.question}</h2>
            <p className="section-description">{translations.description}</p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery-section fade-in">
        <div className="container">
          <h2 className="section-title">
            {translations.recentImages}
          </h2>
          <ImagesBrowser />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section fade-in">
        <div className="container">
          <ContactUs />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p className="footer-text">{translations.footer}</p>
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} {translations.titleLogo} {translations.allRightReserved}.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;