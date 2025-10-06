import React from 'react';
import { useTranslationStore } from '../../stores/useTranslationStore';
import { Phone, Mail } from 'lucide-react';
import './style.scss';

interface Props {
  variant?: 'default' | 'minimal' | 'card';
  showTitle?: boolean;
}

const ContactUs: React.FC<Props> = ({ variant = 'default', showTitle = true }) => {
  const { translations, isEnglish } = useTranslationStore();

  const handlePhoneClick = () => {
    window.location.href = `tel:${translations.phoneNumber.replace(/[\s()-]/g, '')}`;
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${translations.emailAddress}`;
  };

  return (
    <div className={`contact-us contact-us--${variant}`}>
      {showTitle && (
        <div className="contact-header">
          <h2 className="contact-title">{translations.contactTitle}</h2>
          <p className="contact-description">{translations.contactDescription}</p>
        </div>
      )}

      <div className="contact-methods">
        {/* Phone */}
        <a
          href={`tel:${translations.phoneNumber.replace(/[\s()-]/g, '')}`}
          className="contact-item contact-phone"
          onClick={(e) => {
            e.preventDefault();
            handlePhoneClick();
          }}
        >
          <div className="contact-icon">
            <Phone size={24} />
          </div>
          <div className="contact-info">
            <span className="contact-label">
              {isEnglish ? 'Call Us' : 'התקשר אלינו'}
            </span>
            <span className="contact-value">{translations.phoneNumber}</span>
          </div>
        </a>

        {/* Email */}
        <a
          href={`mailto:${translations.emailAddress}`}
          className="contact-item contact-email"
          onClick={(e) => {
            e.preventDefault();
            handleEmailClick();
          }}
        >
          <div className="contact-icon">
            <Mail size={24} />
          </div>
          <div className="contact-info">
            <span className="contact-label">
              {isEnglish ? 'Email Us' : 'שלח מייל'}
            </span>
            <span className="contact-value">{translations.emailAddress}</span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default ContactUs;