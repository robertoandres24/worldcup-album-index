function GlobalStatsBar({ totals, loading }) {
  const { teamCollected, fwcCollected, ccCollected, totalRepeated } = totals

  const TEAM_TOTAL = 960  // 48 teams × 20 stickers
  const FWC_TOTAL = 19
  const CC_TOTAL = 14

  const overallCollected = teamCollected + fwcCollected + ccCollected
  const overallTotal = TEAM_TOTAL + FWC_TOTAL + CC_TOTAL

  const pct = Math.round((overallCollected / overallTotal) * 100)

  return (
    <div className="global-stats-bar">
      <div className="global-stats-header">
        <span className="global-stats-title">📊 Mi Álbum</span>
        <span className="global-stats-pct">{loading ? '...' : `${pct}%`}</span>
      </div>
      <div className="global-stats-progress">
        <div
          className="global-stats-progress-fill"
          style={{ width: loading ? '0%' : `${pct}%` }}
        />
      </div>
      <div className="global-stats-grid">
        <div className="global-stat-item">
          <span className="global-stat-value">{loading ? '–' : `${teamCollected}`}</span>
          <span className="global-stat-label">de {TEAM_TOTAL}</span>
          <span className="global-stat-desc">Selecciones</span>
        </div>
        <div className="global-stat-item global-stat-item--fwc">
          <span className="global-stat-value">{loading ? '–' : `${fwcCollected}`}</span>
          <span className="global-stat-label">de {FWC_TOTAL}</span>
          <span className="global-stat-desc">FWC</span>
        </div>
        <div className="global-stat-item global-stat-item--cc">
          <span className="global-stat-value">{loading ? '–' : `${ccCollected}`}</span>
          <span className="global-stat-label">de {CC_TOTAL}</span>
          <span className="global-stat-desc">CC</span>
        </div>
        <div className="global-stat-item global-stat-item--rep">
          <span className="global-stat-value">{loading ? '–' : totalRepeated}</span>
          <span className="global-stat-label">repetidas</span>
          <span className="global-stat-desc">🔄</span>
        </div>
      </div>
    </div>
  )
}

export default GlobalStatsBar
