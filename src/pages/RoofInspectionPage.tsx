import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslationStore } from '../stores/useTranslationStore';
import DroneScene from '../component/DroneScene';
import ContactUs from '../component/ContactUs';
import ImagesBrowser from '../component/ImagesBrowser';
import { Eye, AlertTriangle, CheckCircle, ArrowLeft } from 'lucide-react';
import './ServicePage.scss';

const RoofInspectionPage: React.FC = () => {
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
    { icon: <Eye size={32} />,           title: translations.roofFeature1, desc: translations.roofFeature1Desc },
    { icon: <AlertTriangle size={32} />, title: translations.roofFeature2, desc: translations.roofFeature2Desc },
    { icon: <CheckCircle size={32} />,   title: translations.roofFeature3, desc: translations.roofFeature3Desc },
  ];

  const steps = [
    { label: translations.step1, title: translations.step1Title, desc: translations.step1Desc, num: '01' },
    { label: translations.step2, title: translations.step2Title, desc: translations.step2Desc, num: '02' },
    { label: translations.step3, title: translations.step3Title, desc: translations.step3Desc, num: '03' },
  ];

  return (
    <div className="service-page">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="sp-hero sp-hero--teal">
        <div className="sp-hero__drone">
          <DroneScene variant="page" autoRotate />
        </div>
        <div className="sp-hero__overlay" />
        <div className="sp-hero__content fade-in">
          <Link to="/" className="sp-back">
            <ArrowLeft size={18} /> {translations.backToHome}
          </Link>
          <h1>{translations.roofInspectionTitle}</h1>
          <p>{translations.roofInspectionSubtitle}</p>
          <Link to="/#contact" className="btn btn--primary">{translations.bookNow}</Link>
        </div>
      </section>

      {/* ── Description ───────────────────────────────────── */}
      <section className="sp-desc fade-in">
        <div className="container">
          <p>{translations.roofInspectionDesc}</p>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────── */}
      <section className="sp-steps fade-in">
        <div className="container">
          <h2 className="section-title">{translations.howItWorks}</h2>
          <div className="sp-steps__grid">
            {steps.map((s, i) => (
              <div key={i} className="sp-step">
                <div className="sp-step__num">{s.num}</div>
                <div className="sp-step__label">{s.label}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────── */}
      <section className="sp-features fade-in">
        <div className="container">
          <h2 className="section-title">{translations.whyChooseUs}</h2>
          <div className="sp-features__grid">
            {features.map((f, i) => (
              <div key={i} className="sp-feature-card">
                <div className="sp-feature-card__icon sp-feature-card__icon--teal">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Drone showcase ────────────────────────────────── */}
      <section className="sp-drone-showcase fade-in">
        <div className="sp-drone-showcase__canvas">
          <DroneScene variant="page" autoRotate />
        </div>
        <div className="sp-drone-showcase__text">
          <h2>{translations.roofInspectionTitle}</h2>
          <p>{translations.roofInspectionDesc}</p>
          <Link to="/#contact" className="btn btn--dark">{translations.getQuote}</Link>
        </div>
      </section>

      {/* ── Gallery ───────────────────────────────────────── */}
      <section className="sp-gallery fade-in">
        <div className="container">
          <h2 className="section-title">{translations.recentImages}</h2>
          <ImagesBrowser />
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

export default RoofInspectionPage;
