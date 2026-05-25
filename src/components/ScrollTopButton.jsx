function ScrollTopButton({ show, isRaised, onClick, t }) {
  if (!show) return null

  return (
    <button
      className={`scroll-top-btn ${isRaised ? 'scroll-top-raised' : ''}`}
      onClick={onClick}
      aria-label={t('scrollToTopAriaLabel')}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  )
}

export default ScrollTopButton
