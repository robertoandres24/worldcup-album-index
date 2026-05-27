import flags from '../data/flags.js'

const FWC_ICON = (
  <svg className="special-icon" viewBox="0 0 24 26" xmlns="http://www.w3.org/2000/svg" fill="none">
    <path d="M5 2h14v8c0 3.9-3.1 7-7 7s-7-3.1-7-7V2z" fill="#FFD700"/>
    <path d="M5 5H2.5C2.5 9 4.5 11.5 5 12" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M19 5h2.5C21.5 9 19.5 11.5 19 12" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M10.5 17h3v4h-3z" fill="#FFC107"/>
    <rect x="7" y="21" width="10" height="3" rx="1.5" fill="#FFD700"/>
  </svg>
)

const CC_ICON = (
  <svg className="special-icon" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" r="13" fill="#E8000E"/>
    <text x="14" y="19" textAnchor="middle" fill="white" fontSize="11" fontWeight="800" fontFamily="system-ui,sans-serif">CC</text>
  </svg>
)

function StickerCard({ sticker, onClick, isComplete, isActive }) {
  const stateClass = isActive ? 'sticker-card--active' : isComplete ? 'sticker-card--complete' : ''

  if (sticker.type) {
    const icon = sticker.type === 'fwc' ? FWC_ICON : CC_ICON
    return (
      <div
        className={`sticker-card sticker-card--special sticker-card--${sticker.type} ${stateClass}`.trim()}
        style={{ cursor: 'pointer' }}
        onClick={onClick}
      >
        <div className="page-number">{sticker.page}</div>
        {icon}
        <div className="country-info">
          <div className="country-code">{sticker.code}</div>
          <div className="country-name">{sticker.label}</div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`sticker-card ${stateClass}`.trim()}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="page-number">{sticker.page}</div>
      <img src={flags[sticker.iso]} alt={sticker.name} className="country-flag" />
      <div className="country-info">
        <div className="country-code">{sticker.code}</div>
        <div className="country-name">{sticker.name}</div>
      </div>
      <div className={`group-badge group-${sticker.group.toLowerCase()}`}>
        {sticker.group}
      </div>
    </div>
  )
}

export default StickerCard
