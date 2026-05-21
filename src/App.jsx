import { useState, useMemo } from 'react'
import { useI18n } from './hooks/useI18n.js'

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

function App() {
  const { locale, t, toggleLocale } = useI18n()
  const [search, setSearch] = useState('')

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
      <div className="lang-toggle">
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
      <header>
        <h1><span>⚽</span> {t('title')}</h1>
        <p>{t('description')}</p>
        <p><em>{t('goodbyeIndex')}</em></p>
        <p><em>{t('lessBrowsing')}</em></p>
      </header>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder={t('searchPlaceholder')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
        />
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
            <div key={sticker.code} className="sticker-card">
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

      <footer>
        <p>
          {t('footer')} <span>Studio84</span>
        </p>
        <div className="github-section">
          <a
            href="https://github.com/robertoandres24/worldcup-album-index"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            <svg className="github-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>GitHub</span>
          </a>
          <p className="github-message">
            ⭐ {t('starMessage')} · {' '}
            <a
              href="https://github.com/robertoandres24/worldcup-album-index/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="issues-link"
            >
              🤓 {t('suggestImprovement')}
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
