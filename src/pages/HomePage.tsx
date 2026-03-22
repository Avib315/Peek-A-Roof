import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslationStore } from '../stores/useTranslationStore';
import DroneScene from '../component/DroneScene';
import ContactForm from '../component/ContactForm';
import ImagesBrowser from '../component/ImagesBrowser';
import imgRealEstate    from '../assets/images/genericImages/arial_props_markeing.jpeg';
import imgRoofInspect   from '../assets/images/genericImages/roofGutterInspection.webp';
import imgMediaContent  from '../assets/images/genericImages/souial-media-for-bis.webp';
import './HomePage.scss';

const HomePage: React.FC = () => {
  const { translations } = useTranslationStore();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('show');
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleContactClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-page">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="home-hero">
        <div className="home-hero__drone">
          <DroneScene variant="hero" autoRotate />
        </div>
        <div className="home-hero__grid" />
        <div className="home-hero__overlay" />
        <div className="home-hero__glow" />
        <div className="home-hero__content fade-in">
          <span className="home-hero__eyebrow">AARON AERIAL · Drone Services</span>
          <h1 className="home-hero__title">{translations.title}</h1>
          <p className="home-hero__subtitle">{translations.secondTitle}</p>
          <div className="home-hero__actions">
            <button className="btn btn--primary" onClick={handleContactClick}>
              {translations.getQuote}
            </button>
            <button className="btn btn--outline" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
              {translations.ourServices}
            </button>
          </div>
        </div>
        <div className="home-hero__scroll-cue">
          <em>scroll</em>
          <span />
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────── */}
      <section className="home-about fade-in">
        <div className="container">
          <span className="section-eyebrow">About Us</span>
          <h2 className="section-title">{translations.question}</h2>
          <div className="cyan-rule" />
          <p className="section-desc">{translations.description}</p>
        </div>
      </section>

      {/* ── Services Grid ─────────────────────────────────── */}
      <section id="services" className="home-services fade-in">
        <div className="container">
          <span className="section-eyebrow">What We Offer</span>
          <h2 className="section-title">{translations.ourServices}</h2>
          <div className="cyan-rule" />
          <div className="service-grid">

            {/* Real Estate */}
            <Link to="/real-estate" className="service-card service-card--blue">
              <div className="service-card__img">
                <img src={imgRealEstate} alt="Aerial real estate filming" />
              </div>
              <div className="service-card__body">
                <h3>{translations.realEstateTitle}</h3>
                <p>{translations.homeServiceCardReal}</p>
                <span className="service-card__cta">{translations.learnMore} →</span>
              </div>
            </Link>

            {/* Roof Inspection */}
            <Link to="/roof-inspection" className="service-card service-card--teal">
              <div className="service-card__img">
                <img src={imgRoofInspect} alt="Roof gutter inspection" />
              </div>
              <div className="service-card__body">
                <h3>{translations.roofInspectionTitle}</h3>
                <p>{translations.homeServiceCardRoof}</p>
                <span className="service-card__cta">{translations.learnMore} →</span>
              </div>
            </Link>

            {/* Media Content */}
            <Link to="/media-content" className="service-card service-card--purple">
              <div className="service-card__img">
                <img src={imgMediaContent} alt="Media content production" />
              </div>
              <div className="service-card__body">
                <h3>{translations.mediaContentTitle}</h3>
                <p>{translations.homeServiceCardMedia}</p>
                <span className="service-card__cta">{translations.learnMore} →</span>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* ── Gallery ───────────────────────────────────────── */}
      <section id="gallery" className="home-gallery fade-in">
        <div className="container">
          <span className="section-eyebrow">Portfolio</span>
          <h2 className="section-title">{translations.recentImages}</h2>
          <div className="cyan-rule" />
          <ImagesBrowser />
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────── */}
      <section id="contact" className="home-contact fade-in">
        <div className="container">
          <ContactForm />
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="footer">
        <div className="container">
          <p className="footer-text">{translations.footer}</p>
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} {translations.titleLogo} — {translations.allRightReserved}.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;
