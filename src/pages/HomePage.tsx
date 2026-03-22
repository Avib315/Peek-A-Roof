import { useEffect } from 'react';
import { useTranslationStore } from '../stores/useTranslationStore';
import DroneScene from '../component/DroneScene';
import ContactForm from '../component/ContactForm';
import imgRealEstate   from '../assets/images/genericImages/arial_props_markeing.jpeg';
import imgRoofInspect  from '../assets/images/genericImages/roofGutterInspection.webp';
import imgMediaContent from '../assets/images/genericImages/souial-media-for-bis.webp';
import settings from '../assets/settings/settings.json';
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
      { threshold: 0.1 }
    );
    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const services = [
    { num: '01', img: imgRoofInspect,  title: translations.s1Title, tag: translations.s1Tag, desc: translations.s1Desc, cta: translations.s1Cta },
    { num: '02', img: imgRealEstate,   title: translations.s2Title, tag: translations.s2Tag, desc: translations.s2Desc, cta: translations.s2Cta },
    { num: '03', img: imgMediaContent, title: translations.s3Title, tag: translations.s3Tag, desc: translations.s3Desc, cta: translations.s3Cta },
    { num: '04', img: imgRealEstate,   title: translations.s4Title, tag: translations.s4Tag, desc: translations.s4Desc, cta: translations.s4Cta },
  ];

  const reviews = settings.reviews;
  const stats   = settings.stats;

  const whyPoints = [
    translations.whyPoint1,
    translations.whyPoint2,
    translations.whyPoint3,
    translations.whyPoint4,
    translations.whyPoint5,
  ];

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
          <span className="home-hero__eyebrow">{translations.heroEyebrow}</span>
          <h1 className="home-hero__title">
            <span>{translations.heroLine1}</span>
            <span>{translations.heroLine2}</span>
          </h1>
          <p className="home-hero__subtitle">{translations.secondTitle}</p>
          <div className="home-hero__actions">
            <a href="#services" className="btn btn--primary">{translations.viewServices}</a>
            <a href="#contact"  className="btn btn--outline">{translations.getFreeQuote}</a>
          </div>
        </div>
        <div className="home-hero__scroll-cue">
          <em>scroll</em>
          <span />
        </div>
      </section>

      {/* ── Services ──────────────────────────────────────── */}
      <section id="services" className="home-services fade-in">
        <div className="container">
          <span className="section-eyebrow">{translations.whatWeDo}</span>
          <h2 className="section-title">{translations.ourServices}</h2>
          <div className="cyan-rule" />
          <div className="service-list">
            {services.map((s) => (
              <div key={s.num} className="service-item">
                <div className="service-item__img">
                  <img src={s.img} alt={s.title} />
                </div>
                <div className="service-item__body">
                  <span className="service-item__num">{s.num}</span>
                  <h3 className="service-item__title">{s.title}</h3>
                  <p className="service-item__tag">{s.tag}</p>
                  <p className="service-item__desc">{s.desc}</p>
                  <a href="#contact" className="service-item__cta">{s.cta}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ───────────────────────────────────────── */}
      <section id="gallery" className="home-gallery fade-in">
        <div className="container">
          <span className="section-eyebrow">{translations.ourWork}</span>
          <h2 className="section-title">{translations.shotFromAbove}</h2>
          <div className="cyan-rule" />
          <p className="section-desc">{translations.gallerySubtitle}</p>
          <div className="gallery-stats">
            {stats.map((s) => (
              <div key={s.label} className="gallery-stat">
                <span className="gallery-stat__value">{s.value}</span>
                <span className="gallery-stat__label">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="gallery-cta">
            <a href="/roof-inspection" className="btn btn--outline">{translations.recentImages} →</a>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ─────────────────────────────────── */}
      <section id="about" className="home-why fade-in">
        <div className="container">
          <span className="section-eyebrow">{translations.whyChooseUs}</span>
          <h2 className="section-title">{translations.whyChooseUsTitle}</h2>
          <div className="cyan-rule" />
          <p className="section-desc">{translations.whyChooseUsDesc}</p>
          <ul className="why-list">
            {whyPoints.map((point, i) => (
              <li key={i} className="why-list__item">
                <span className="why-list__check">✓</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Who We Work With ──────────────────────────────── */}
      <section className="home-clients fade-in">
        <div className="container">
          <span className="section-eyebrow">{translations.whoWeWorkWith}</span>
          <h2 className="section-title">
            {translations.builtForEveryone}<br />
            <span className="section-title--sub">{translations.fromTheGroundUp}</span>
          </h2>
          <div className="cyan-rule" />
          <div className="client-tags">
            {settings.clientTypes.map((type) => (
              <span key={type} className="client-tag">{type}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ───────────────────────────────────────── */}
      <section id="reviews" className="home-reviews fade-in">
        <div className="container">
          <span className="section-eyebrow">{translations.whatClientsSay}</span>
          <h2 className="section-title">{translations.trustedBy}</h2>
          <div className="cyan-rule" />
          <div className="reviews-grid">
            {reviews.map((r) => (
              <div key={r.id} className="review-card">
                <div className="review-card__stars">{'★'.repeat(r.stars)}</div>
                <p className="review-card__quote">"{r.quote}"</p>
                <div className="review-card__author">
                  <strong>{r.name}</strong>
                  <span>{r.title}</span>
                </div>
              </div>
            ))}
          </div>
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
          <p className="footer-brand">{translations.titleLogo} SERVICES</p>
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Aaron Aerial Services. {translations.allRightReserved}.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;
