import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslationStore } from '../stores/useTranslationStore';
import DroneScene from '../component/DroneScene';
import ContactUs from '../component/ContactUs';
import { Camera, Play, Edit3, ArrowLeft } from 'lucide-react';
import './ServicePage.scss';

const RealEstatePage: React.FC = () => {
  const { translations } = useTranslationStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('show'); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const features = [
    { icon: <Camera size={32} />, title: translations.realEstateFeature1, desc: translations.realEstateFeature1Desc },
    { icon: <Play size={32} />,   title: translations.realEstateFeature2, desc: translations.realEstateFeature2Desc },
    { icon: <Edit3 size={32} />,  title: translations.realEstateFeature3, desc: translations.realEstateFeature3Desc },
  ];

  return (
    <div className="service-page">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="sp-hero sp-hero--blue">
        <div className="sp-hero__drone">
          <DroneScene variant="page" autoRotate />
        </div>
        <div className="sp-hero__overlay" />
        <div className="sp-hero__content fade-in">
          <Link to="/" className="sp-back">
            <ArrowLeft size={18} /> {translations.backToHome}
          </Link>
          <h1>{translations.realEstateTitle}</h1>
          <p>{translations.realEstateSubtitle}</p>
          <Link to="/#contact" className="btn btn--primary">{translations.bookNow}</Link>
        </div>
      </section>

      {/* ── Description ───────────────────────────────────── */}
      <section className="sp-desc fade-in">
        <div className="container">
          <p>{translations.realEstateDesc}</p>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────── */}
      <section className="sp-features fade-in">
        <div className="container">
          <h2 className="section-title">{translations.whyChooseUs}</h2>
          <div className="sp-features__grid">
            {features.map((f, i) => (
              <div key={i} className="sp-feature-card">
                <div className="sp-feature-card__icon sp-feature-card__icon--blue">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Inline 3D Drone showcase ─────────────────────── */}
      <section className="sp-drone-showcase fade-in">
        <div className="sp-drone-showcase__canvas">
          <DroneScene variant="page" autoRotate />
        </div>
        <div className="sp-drone-showcase__text">
          <h2>{translations.realEstateTitle}</h2>
          <p>{translations.realEstateDesc}</p>
          <Link to="/#contact" className="btn btn--dark">{translations.getQuote}</Link>
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────── */}
      <section className="sp-contact fade-in">
        <div className="container">
          <ContactUs />
        </div>
      </section>

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

export default RealEstatePage;
