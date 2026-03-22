import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslationStore } from '../stores/useTranslationStore';
import DroneScene from '../component/DroneScene';
import ContactUs from '../component/ContactUs';
import { Star, Megaphone, Film, ArrowLeft, Play } from 'lucide-react';
import videoBistro from '../assets/videos/media_content_bistro.mov';
import videoNov    from '../assets/videos/media_conent_nov.mov';
import './ServicePage.scss';
import './MediaContentPage.scss';

// ── Video card with click-to-play ──────────────────────────────────────────
interface VideoCardProps {
  src: string;
  title: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ src, title }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else          { v.pause(); setPlaying(false); }
  };

  return (
    <div className="media-video-card" onClick={toggle}>
      <video
        ref={videoRef}
        src={src}
        playsInline
        controls={playing}
        className="media-video-card__video"
        onEnded={() => setPlaying(false)}
      />
      {!playing && (
        <div className="media-video-card__overlay">
          <div className="media-video-card__play">
            <Play size={40} fill="white" />
          </div>
          <p className="media-video-card__title">{title}</p>
        </div>
      )}
    </div>
  );
};

// ───────────────────────────────────────────────────────────────────────────
const MediaContentPage: React.FC = () => {
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
    { icon: <Star size={32} />,      title: translations.mediaFeature1, desc: translations.mediaFeature1Desc },
    { icon: <Megaphone size={32} />, title: translations.mediaFeature2, desc: translations.mediaFeature2Desc },
    { icon: <Film size={32} />,      title: translations.mediaFeature3, desc: translations.mediaFeature3Desc },
  ];

  return (
    <div className="service-page">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="sp-hero sp-hero--purple">
        <div className="sp-hero__drone">
          <DroneScene variant="page" autoRotate />
        </div>
        <div className="sp-hero__overlay" />
        <div className="sp-hero__content fade-in">
          <Link to="/" className="sp-back">
            <ArrowLeft size={18} /> {translations.backToHome}
          </Link>
          <h1>{translations.mediaContentTitle}</h1>
          <p>{translations.mediaContentSubtitle}</p>
          <Link to="/#contact" className="btn btn--primary">{translations.bookNow}</Link>
        </div>
      </section>

      {/* ── Description ───────────────────────────────────── */}
      <section className="sp-desc fade-in">
        <div className="container">
          <p>{translations.mediaContentDesc}</p>
        </div>
      </section>

      {/* ── Video gallery ─────────────────────────────────── */}
      <section className="sp-video fade-in">
        <div className="container">
          <h2 className="section-title">{translations.mediaContentTitle}</h2>
          <div className="media-video-grid">
            <VideoCard src={videoNov}    title="Nov" />
            <VideoCard src={videoBistro} title="Bistro" />
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
                <div className="sp-feature-card__icon sp-feature-card__icon--purple">{f.icon}</div>
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
          <h2>{translations.mediaContentTitle}</h2>
          <p>{translations.mediaContentDesc}</p>
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

export default MediaContentPage;
