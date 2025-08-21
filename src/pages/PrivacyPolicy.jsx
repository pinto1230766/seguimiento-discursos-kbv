import React from 'react';
import { useTranslation } from 'react-i18next';

function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <div className="container fade-in" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ color: 'var(--color-primary)', marginBottom: '24px', textAlign: 'center' }}>
        {t('politiqueConfidentialite')}
      </h1>
      
      <div className="card" style={{ padding: '24px' }}>
        <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          })}
        </p>

        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ color: 'var(--color-primary)', marginBottom: '12px' }}>1. {t('collecteDonnees')}</h2>
          <p style={{ marginBottom: '12px', lineHeight: '1.6' }}>
            {t('collecteDonneesTexte')}
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
            <li>{t('collecteDonnees1')}</li>
            <li>{t('collecteDonnees2')}</li>
            <li>{t('collecteDonnees3')}</li>
            <li>{t('collecteDonnees4')}</li>
          </ul>
        </section>

        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ color: 'var(--color-primary)', marginBottom: '12px' }}>2. {t('utilisationDonnees')}</h2>
          <p style={{ marginBottom: '12px', lineHeight: '1.6' }}>
            {t('utilisationDonneesTexte')}
          </p>
        </section>

        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ color: 'var(--color-primary)', marginBottom: '12px' }}>3. {t('protectionDonnees')}</h2>
          <p style={{ marginBottom: '12px', lineHeight: '1.6' }}>
            {t('protectionDonneesTexte')}
          </p>
        </section>

        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ color: 'var(--color-primary)', marginBottom: '12px' }}>4. {t('droitsUtilisateurs')}</h2>
          <p style={{ marginBottom: '12px', lineHeight: '1.6' }}>
            {t('droitsUtilisateursTexte')}
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
            <li>{t('droitAcces')}</li>
            <li>{t('droitRectification')}</li>
            <li>{t('droitSuppression')}</li>
            <li>{t('droitPortabilite')}</li>
            <li>{t('droitOpposition')}</li>
          </ul>
        </section>

        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ color: 'var(--color-primary)', marginBottom: '12px' }}>5. {t('cookies')}</h2>
          <p style={{ marginBottom: '12px', lineHeight: '1.6' }}>
            {t('cookiesTexte')}
          </p>
        </section>

        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ color: 'var(--color-primary)', marginBottom: '12px' }}>6. {t('modifications')}</h2>
          <p style={{ marginBottom: '12px', lineHeight: '1.6' }}>
            {t('modificationsTexte')}
          </p>
        </section>

        <section>
          <h2 style={{ color: 'var(--color-primary)', marginBottom: '12px' }}>7. {t('nousContacter')}</h2>
          <p style={{ marginBottom: '12px', lineHeight: '1.6' }}>
            {t('nousContacterTexte')}
          </p>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
