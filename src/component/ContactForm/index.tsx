import { useState } from 'react';
import { useTranslationStore } from '../../stores/useTranslationStore';
import { Mail, Phone, MapPin, Facebook, Instagram, CheckCircle } from 'lucide-react';
import './style.scss';

const ContactForm: React.FC = () => {
  const { translations } = useTranslationStore();

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', service: '', message: '',
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  const serviceOptions = [
    translations.s1Title,
    translations.s2Title,
    translations.s3Title,
    translations.s4Title,
  ];

  const infoItems = [
    {
      icon: <Mail size={20} />,
      label: translations.emailUs,
      value: translations.emailAddress,
      href: `mailto:${translations.emailAddress}`,
    },
    {
      icon: <Phone size={20} />,
      label: translations.callUs,
      value: translations.phoneNumber,
      href: `tel:${translations.phoneNumber.replace(/\s/g, '')}`,
    },
    {
      icon: <MapPin size={20} />,
      label: 'Location',
      value: translations.locationText,
      href: undefined,
    },
  ];

  const socials = [
    { icon: <Facebook size={18} />, label: translations.facebookLabel, href: 'https://www.facebook.com/aaronaerialservices', abbr: 'f' },
    { icon: <Instagram size={18} />, label: translations.instagramLabel, href: 'https://www.instagram.com/aaronaerialservices', abbr: 'ig' },
  ];

  return (
    <div className="contact-form-wrap">
      <div className="contact-form-grid">

        {/* ── Left: form ─────────────────────────────────── */}
        <div className="contact-form-left">
          <span className="cf-eyebrow">{translations.getInTouch}</span>
          <h2 className="cf-title">{translations.letsWorkTogether}</h2>
          <p className="cf-desc">{translations.contactFormDesc}</p>

          {sent ? (
            <div className="cf-success">
              <CheckCircle size={40} />
              <p>{translations.messageSent}</p>
            </div>
          ) : (
            <form className="cf-form" onSubmit={handleSubmit} noValidate>

              {/* Name row */}
              <div className="cf-row">
                <div className="cf-field">
                  <label htmlFor="cf-firstName">{translations.firstName}</label>
                  <input id="cf-firstName" name="firstName" type="text" required
                    value={form.firstName} onChange={handleChange} placeholder="John" />
                </div>
                <div className="cf-field">
                  <label htmlFor="cf-lastName">{translations.lastName}</label>
                  <input id="cf-lastName" name="lastName" type="text" required
                    value={form.lastName} onChange={handleChange} placeholder="Smith" />
                </div>
              </div>

              {/* Email */}
              <div className="cf-field">
                <label htmlFor="cf-email">{translations.yourEmail}</label>
                <input id="cf-email" name="email" type="email" required
                  value={form.email} onChange={handleChange} placeholder="john@example.com" />
              </div>

              {/* Phone */}
              <div className="cf-field">
                <label htmlFor="cf-phone">{translations.phoneLabel}</label>
                <input id="cf-phone" name="phone" type="tel"
                  value={form.phone} onChange={handleChange} placeholder="+44 7000 000000" />
              </div>

              {/* Service */}
              <div className="cf-field">
                <label htmlFor="cf-service">{translations.serviceRequired}</label>
                <select id="cf-service" name="service" value={form.service} onChange={handleChange}>
                  <option value="">{translations.selectService}</option>
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="cf-field">
                <label htmlFor="cf-message">{translations.yourMessage}</label>
                <textarea id="cf-message" name="message" rows={4} required
                  value={form.message} onChange={handleChange}
                  placeholder="Tell us a bit about what you need..." />
              </div>

              <button type="submit" className="cf-submit" disabled={loading}>
                {loading ? <span className="cf-spinner" /> : translations.sendEnquiry}
              </button>
            </form>
          )}
        </div>

        {/* ── Right: info + socials ──────────────────────── */}
        <div className="contact-form-right">
          <div className="cf-info-list">
            {infoItems.map((item, i) => (
              <div key={i} className="cf-info-item">
                <div className="cf-info-item__icon">{item.icon}</div>
                <div className="cf-info-item__text">
                  <span className="cf-info-item__label">{item.label}</span>
                  {item.href ? (
                    <a href={item.href} className="cf-info-item__value">{item.value}</a>
                  ) : (
                    <span className="cf-info-item__value">{item.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="cf-socials">
            {socials.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="cf-social-link">
                <span className="cf-social-link__abbr">{s.abbr}</span>
                <span className="cf-social-link__icon">{s.icon}</span>
                <span className="cf-social-link__label">{s.label}</span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactForm;
