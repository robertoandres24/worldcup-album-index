import { useState, useMemo, useEffect } from 'react'
import { useI18n } from './hooks/useI18n.js'
import curiosities from './curiosities.json'

const stickersData = [
  // Grupo A
  { page: 8, code: 'MEX', name: 'Mexico', group: 'A' },
  { page: 10, code: 'RSA', name: 'South Africa', group: 'A' },
  { page: 12, code: 'KOR', name: 'Korea Republic', group: 'A' },
  { page: 14, code: 'CZE', name: 'Czechia', group: 'A' },
  { page: 16, code: 'CAN', name: 'Canada', group: 'A' },
  { page: 18, code: 'BIH', name: 'Bosnia & Herzegovina', group: 'A' },
  { page: 20, code: 'QAT', name: 'Qatar', group: 'A' },
  { page: 22, code: 'SUI', name: 'Switzerland', group: 'A' },
  // Grupo C
  { page: 24, code: 'BRA', name: 'Brazil', group: 'C' },
  { page: 26, code: 'MAR', name: 'Morocco', group: 'C' },
  { page: 28, code: 'HAI', name: 'Haiti', group: 'C' },
  { page: 30, code: 'SCO', name: 'Scotland', group: 'C' },
  { page: 32, code: 'USA', name: 'USA', group: 'C' },
  { page: 34, code: 'PAR', name: 'Paraguay', group: 'C' },
  { page: 36, code: 'AUS', name: 'Australia', group: 'C' },
  { page: 38, code: 'TUR', name: 'Turkey', group: 'C' },
  // Grupo E
  { page: 40, code: 'GER', name: 'Germany', group: 'E' },
  { page: 42, code: 'CUW', name: 'Curacao', group: 'E' },
  { page: 44, code: 'CIV', name: "Cote d'Ivoire", group: 'E' },
  { page: 46, code: 'ECU', name: 'Ecuador', group: 'E' },
  { page: 48, code: 'NED', name: 'Netherlands', group: 'E' },
  { page: 50, code: 'JPN', name: 'Japan', group: 'E' },
  { page: 52, code: 'SWE', name: 'Sweden', group: 'E' },
  { page: 54, code: 'TUN', name: 'Tunisia', group: 'E' },
  // Grupo G
  { page: 58, code: 'BEL', name: 'Belgium', group: 'G' },
  { page: 60, code: 'EGY', name: 'Egypt', group: 'G' },
  { page: 62, code: 'IRN', name: 'IR Iran', group: 'G' },
  { page: 64, code: 'NZL', name: 'New Zealand', group: 'G' },
  { page: 66, code: 'ESP', name: 'Spain', group: 'G' },
  { page: 68, code: 'CPV', name: 'Cape Verde', group: 'G' },
  { page: 70, code: 'KSA', name: 'Saudi Arabia', group: 'G' },
  { page: 72, code: 'URU', name: 'Uruguay', group: 'G' },
  // Grupo I
  { page: 74, code: 'FRA', name: 'France', group: 'I' },
  { page: 76, code: 'SEN', name: 'Senegal', group: 'I' },
  { page: 78, code: 'IRQ', name: 'Iraq', group: 'I' },
  { page: 80, code: 'NOR', name: 'Norway', group: 'I' },
  { page: 82, code: 'ARG', name: 'Argentina', group: 'I' },
  { page: 84, code: 'ALG', name: 'Algeria', group: 'I' },
  { page: 86, code: 'AUT', name: 'Austria', group: 'I' },
  { page: 88, code: 'JOR', name: 'Jordan', group: 'I' },
  // Grupo K
  { page: 90, code: 'POR', name: 'Portugal', group: 'K' },
  { page: 92, code: 'COD', name: 'Congo DR', group: 'K' },
  { page: 94, code: 'UZB', name: 'Uzbekistan', group: 'K' },
  { page: 96, code: 'COL', name: 'Colombia', group: 'K' },
  { page: 98, code: 'ENG', name: 'England', group: 'K' },
  { page: 100, code: 'CRO', name: 'Croatia', group: 'K' },
  { page: 102, code: 'GHA', name: 'Ghana', group: 'K' },
  { page: 104, code: 'PAN', name: 'Panama', group: 'K' },
]

// Create a map for O(1) lookup of curiosities by country code
const curiositiesMap = new Map(curiosities.map(c => [c.code, c.datos_curiosos]))

function CuriosityCarousel({ countryCode }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  
  const countryCuriosities = curiositiesMap.get(countryCode) || []
  
  if (countryCuriosities.length === 0) return null
  
  const goToPrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev === 0 ? countryCuriosities.length - 1 : prev - 1))
  }
  
  const goToNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev === countryCuriosities.length - 1 ? 0 : prev + 1))
  }
  
  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  return (
    <div className="curiosity-carousel">
      <div className="curiosity-header">
        <span className="curiosity-icon">💡</span>
        <span className="curiosity-title">Sabías que...</span>
        <span className="curiosity-counter">{currentIndex + 1} / {countryCuriosities.length}</span>
      </div>
      
      <div className="curiosity-content-wrapper">
        <button 
          className="curiosity-nav curiosity-nav-prev" 
          onClick={goToPrev}
          aria-label="Anterior curiosidad"
        >
          ‹
        </button>
        
        <div className="curiosity-slider">
          <div 
            className="curiosity-slide"
            key={currentIndex}
          >
            {countryCuriosities[currentIndex]}
          </div>
        </div>
        
        <button 
          className="curiosity-nav curiosity-nav-next" 
          onClick={goToNext}
          aria-label="Siguiente curiosidad"
        >
          ›
        </button>
      </div>
      
      <div className="curiosity-dots">
        {countryCuriosities.map((_, index) => (
          <button
            key={index}
            className={`curiosity-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir a curiosidad ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

function App() {
  const { locale, t, toggleLocale } = useI18n()
  const [search, setSearch] = useState('')
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isAtBottom, setIsAtBottom] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [showAbout, setShowAbout] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 300
      setShowScrollTop(scrolled)
      
      // Detect if near bottom (within 100px)
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100
      setIsAtBottom(scrolled && nearBottom)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showShareMenu && !e.target.closest('.share-container')) {
        setShowShareMenu(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [showShareMenu])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleShareMenu = () => {
    setShowShareMenu(!showShareMenu)
  }

  const shareLinks = {
    whatsapp: () => {
      const text = encodeURIComponent(`${t('shareTitle')}\n${t('shareText')}\n${window.location.href}`)
      window.open(`https://wa.me/?text=${text}`, '_blank')
    },
    facebook: () => {
      const url = encodeURIComponent(window.location.href)
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
    },
    x: () => {
      const text = encodeURIComponent(`${t('shareTitle')} - ${t('shareText')}`)
      const url = encodeURIComponent(window.location.href)
      window.open(`https://x.com/intent/tweet?text=${text}&url=${url}`, '_blank')
    },
    linkedin: () => {
      const url = encodeURIComponent(window.location.href)
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
    },
    copyLink: async () => {
      try {
        await navigator.clipboard.writeText(`${t('shareTitle')}\n${t('shareText')}\n${window.location.href}`)
        alert(t('linkCopied'))
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }
  }

  const filteredStickers = useMemo(() => {
    if (!search.trim()) return stickersData
    const query = search.toUpperCase()
    return stickersData.filter(
      (s) =>
        s.code.includes(query) ||
        s.name.toUpperCase().includes(query) ||
        s.page.toString().includes(query)
    )
  }, [search])

  return (
    <div className="container">
      <div className="top-bar">
        <button className="about-link" onClick={() => setShowAbout(true)}>
          {t('aboutButton')}
        </button>
        <div className="share-container">
          <button className="share-btn" onClick={toggleShareMenu} aria-label={t('share')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>
          {showShareMenu && (
            <div className="share-menu">
              <button className="share-option whatsapp" onClick={shareLinks.whatsapp} aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <span>WhatsApp</span>
              </button>
              <button className="share-option facebook" onClick={shareLinks.facebook} aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                <span>Facebook</span>
              </button>
              <button className="share-option x" onClick={shareLinks.x} aria-label="X">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                <span>X</span>
              </button>
              <button className="share-option linkedin" onClick={shareLinks.linkedin} aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                <span>LinkedIn</span>
              </button>
              <button className="share-option copy" onClick={shareLinks.copyLink} aria-label={t('linkCopied')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                <span>{t('copyLink')}</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <header className={searchFocused ? 'search-focus-mode' : ''}>
        <h1><span>⚽</span> {t('title')}</h1>
        <p>{t('description')}</p>
      </header>

      {showAbout && (
        <div className="about-modal-overlay" onClick={() => setShowAbout(false)}>
          <div className="about-modal" onClick={(e) => e.stopPropagation()}>
            <button className="about-close-btn" onClick={() => setShowAbout(false)} aria-label="Close">
              ×
            </button>
            <div className="about-content">
              <h2>{t('aboutTitle')}</h2>
              <p>{t('aboutParagraph1')}</p>
              <p>{t('aboutParagraph2')}</p>
              <p>{t('aboutParagraph3')}</p>
              <p>
                {t('aboutParagraph4a')}{' '}
                <a href="https://ko-fi.com/studio84" target="_blank" rel="noopener noreferrer" className="about-kofi-link">
                  {t('aboutParagraph4b')}
                </a>{' '}
                {t('aboutParagraph4c')}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="search-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder={t('searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
          />
          {search && (
            <button
              className="search-clear-btn"
              onClick={() => setSearch('')}
              aria-label="Limpiar búsqueda"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {search && (
        <div className="results-count">
          {filteredStickers.length} {filteredStickers.length === 1 ? t('resultsCount') : t('resultsCountPlural')}
        </div>
      )}

      <div className="stickers-list">
        {filteredStickers.length === 0 ? (
          <div className="no-results">
            <div className="no-results-emoji">🤷‍♂️</div>
            <p>{t('noResults')}</p>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
              {t('sureNotPasted')}
            </p>
          </div>
        ) : (
          filteredStickers.map((sticker) => (
            <div
              key={sticker.code}
              className="sticker-card"
              onClick={() => setSearch(sticker.code)}
              style={{ cursor: 'pointer' }}
            >
              <div className="page-number">{sticker.page}</div>
              <div className="country-info">
                <div className="country-code">{sticker.code}</div>
                <div className="country-name">{sticker.name}</div>
              </div>
              <div className={`group-badge group-${sticker.group.toLowerCase()}`}>
                {sticker.group}
              </div>
            </div>
          ))
        )}
      </div>

      {filteredStickers.length === 1 && (
        <CuriosityCarousel countryCode={filteredStickers[0].code} />
      )}

      <footer>
        <div className="kofi-section">
          <p className="kofi-message">
            ☕ {t('kofiMessage')}
          </p>
          <p className="kofi-sub-message">
            {t('kofiSubMessage')}
          </p>
          <a
            href="https://ko-fi.com/studio84"
            target="_blank"
            rel="noopener noreferrer"
            className="kofi-btn"
          >
            <img src="/kofi-icon.png" alt="Ko-fi" className="kofi-icon" />
            {t('kofiButton')}
          </a>
        </div>

                <div className="github-section">
          <p className="github-developed-by">
            <span className="footer-text">{t('footer')}</span>
            <a
              href="https://github.com/robertoandres24/worldcup-album-index"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
            >
              <span className="footer-brand">Studio84</span>
              <svg className="github-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </p>
        </div>

        <div className="lang-toggle footer-lang">
          <button
            className={`lang-btn ${locale === 'es' ? 'active' : ''}`}
            onClick={() => locale !== 'es' && toggleLocale()}
          >
            ES
          </button>
          <button
            className={`lang-btn ${locale === 'en' ? 'active' : ''}`}
            onClick={() => locale !== 'en' && toggleLocale()}
          >
            EN
          </button>
        </div>
      </footer>

      {showScrollTop && (
        <button
          className={`scroll-top-btn ${isAtBottom ? 'scroll-top-raised' : ''}`}
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default App
