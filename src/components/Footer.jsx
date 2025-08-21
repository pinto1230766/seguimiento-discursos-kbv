import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      padding: '16px',
      textAlign: 'center',
      fontSize: '12px',
      color: 'var(--color-text-secondary)',
      borderTop: '1px solid var(--color-border)',
      marginTop: 'auto',
      backgroundColor: 'var(--color-bg-elevated)'
    }}>
      <div style={{ marginBottom: '8px' }}>
        <Link 
          to="/privacy" 
          style={{
            color: 'var(--color-primary)',
            textDecoration: 'none',
            margin: '0 8px'
          }}
        >
          {t('politiqueConfidentialite')}
        </Link>
        <span>•</span>
        <a 
          href="https://jw.org" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            color: 'var(--color-primary)',
            textDecoration: 'none',
            margin: '0 8px'
          }}
        >
          jw.org
        </a>
      </div>
      <div>
        {t('todosOsDireitos')} © {currentYear} | {t('desenvolvidoPara')}
      </div>
    </footer>
  );
}

export default Footer;
