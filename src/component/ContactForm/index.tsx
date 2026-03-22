import { useState } from 'react';
import { useTranslationStore } from '../../stores/useTranslationStore';
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import settings from '../../assets/settings/settings.json';
import './style.scss';

const socialIconMap: Record<string, React.ReactNode> = {
  facebook:  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  instagram: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>,
};

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

  const serviceOptions = settings.services
    .filter((s) => s.enabled)
    .map((s) => s.contactSubject);

  const infoItems = [
    {
      icon: <Mail size={20} />,
      label: translations.emailUs,
      value: settings.business.email,
      href: `mailto:${settings.business.email}`,
    },
    {
      icon: <Phone size={20} />,
      label: translations.callUs,
      value: settings.business.phone,
      href: `tel:${settings.business.phone.replace(/\s/g, '')}`,
    },
    {
      icon: <MapPin size={20} />,
      label: 'Location',
      value: settings.business.location,
      href: undefined,
    },
  ];

  const socials = settings.social.map((s) => ({
    icon: socialIconMap[s.id] ?? null,
    label: s.label,
    href: s.url,
    abbr: s.abbr,
  }));

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
