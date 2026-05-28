import { useState, useEffect } from 'react'

function GlobalStatsBar({ totals, loading, t }) {
  const { teamCollected, fwcCollected, ccCollected, paniniCollected, totalRepeated } = totals

  const TEAM_TOTAL = 960 // 48 teams × 20 stickers
  const FWC_TOTAL = 19
  const CC_TOTAL = 14
  const PANINI_TOTAL = 1

  const overallCollected = teamCollected + fwcCollected + ccCollected + paniniCollected
  const overallTotal = TEAM_TOTAL + FWC_TOTAL + CC_TOTAL + PANINI_TOTAL

  const pct = Math.round((overallCollected / overallTotal) * 100)

  const [displayPct, setDisplayPct] = useState(0)

  useEffect(() => {
    if (loading) {
      setDisplayPct(0)
      return
    }
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setDisplayPct(pct))
    })
    return () => cancelAnimationFrame(raf)
  }, [loading, pct])

  return (
    <div className="global-stats-bar">
      <div className="global-stats-header">
        <span className="global-stats-title">{t('myAlbumTitle')}</span>
        <span className="global-stats-pct">{loading ? '...' : `${pct}%`}</span>
      </div>
      <div className="global-stats-progress">
        <div className="global-stats-progress-fill" style={{ width: `${displayPct}%` }} />
        {loading && (
          <div className="global-stats-progress-skeleton global-stats-progress-skeleton--overlay" />
        )}
      </div>
      <div className="global-stats-grid">
        <div className="global-stat-item">
          {loading ? (
            <span className="global-stat-skeleton" />
          ) : (
            <span className="global-stat-value">{teamCollected}</span>
          )}
          <span className="global-stat-label">
            {t('statOf')} {TEAM_TOTAL}
          </span>
          <span className="global-stat-desc">{t('statTeams')}</span>
        </div>
        <div className="global-stat-item global-stat-item--fwc">
          {loading ? (
            <span className="global-stat-skeleton" />
          ) : (
            <span className="global-stat-value">{fwcCollected}</span>
          )}
          <span className="global-stat-label">
            {t('statOf')} {FWC_TOTAL}
          </span>
          <span className="global-stat-desc">FWC</span>
        </div>
        <div className="global-stat-item global-stat-item--cc">
          {loading ? (
            <span className="global-stat-skeleton" />
          ) : (
            <span className="global-stat-value">{ccCollected}</span>
          )}
          <span className="global-stat-label">
            {t('statOf')} {CC_TOTAL}
          </span>
          <span className="global-stat-desc">CC</span>
        </div>
        <div className="global-stat-item global-stat-item--panini">
          {loading ? (
            <span className="global-stat-skeleton" />
          ) : (
            <span className="global-stat-value">{paniniCollected}</span>
          )}
          <span className="global-stat-label">
            {t('statOf')} {PANINI_TOTAL}
          </span>
          <span className="global-stat-desc">00 PANINI</span>
        </div>
        <div className="global-stat-item global-stat-item--rep">
          {loading ? (
            <span className="global-stat-skeleton" />
          ) : (
            <span className="global-stat-value">{totalRepeated}</span>
          )}
          <span className="global-stat-label">{t('statRepeated')}</span>
          <span className="global-stat-desc">🔄</span>
        </div>
      </div>
    </div>
  )
}

export default GlobalStatsBar
