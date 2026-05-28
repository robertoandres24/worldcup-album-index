function AboutModal({ onClose, t }) {
  return (
    <div className="about-modal-overlay" onClick={onClose}>
      <div className="about-modal" onClick={(e) => e.stopPropagation()}>
        <button className="about-close-btn" onClick={onClose} aria-label={t('closeAriaLabel')}>
          ×
        </button>
        <div className="about-content">
          <h2>{t('aboutTitle')}</h2>
          <p>{t('aboutParagraph1')}</p>
          <p>{t('aboutParagraph2')}</p>
          <p>{t('aboutParagraph3')}</p>
          <p>
            {t('aboutParagraph4a')}{' '}
            <a href="https://link.mercadopago.cl/mialbumfifa" target="_blank" rel="noopener noreferrer" className="about-kofi-link">
              {t('aboutParagraph4b')}
            </a>
            {t('aboutParagraph4c') && ' ' + t('aboutParagraph4c')}
          </p>
          <p>{t('aboutParagraph4d')}</p>
          <p>{t('aboutParagraph4e')}</p>
        </div>
      </div>
    </div>
  )
}

export default AboutModal
