import StickerCard from './StickerCard.jsx'

function StickerList({ stickers, onSelect, t, scrollToTop }) {
  if (stickers.length === 0) {
    return (
      <div className="no-results">
        <div className="no-results-emoji">🤷‍♂️</div>
        <p>{t('noResults')}</p>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
          {t('sureNotPasted')}
        </p>
      </div>
    )
  }

  return (
    <div className="stickers-list">
      {stickers.map((sticker) => (
        <StickerCard
          key={sticker.code}
          sticker={sticker}
          onClick={() => { onSelect(sticker.code); scrollToTop() }}
        />
      ))}
    </div>
  )
}

export default StickerList
