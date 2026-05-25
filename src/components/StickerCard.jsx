import flags from '../data/flags.js'

function StickerCard({ sticker, onClick }) {
  if (sticker.type) {
    return (
      <div
        className={`sticker-card sticker-card--special sticker-card--${sticker.type}`}
        style={{ cursor: 'pointer' }}
        onClick={onClick}
      >
        <div className="page-number">{sticker.page}</div>
        <div className="special-card-label">{sticker.code}</div>
      </div>
    )
  }

  return (
    <div
      className="sticker-card"
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
