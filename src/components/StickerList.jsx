import { useMemo } from 'react'
import StickerCard from './StickerCard.jsx'

function StickerList({ stickers, onSelect, collection, selectedCode, t }) {
  const completedCodes = useMemo(() => {
    const set = new Set()
    stickers.forEach((sticker) => {
      const total = sticker.count ?? 20
      const codeMap = collection?.[sticker.code] ?? {}
      const collectedCount = Object.values(codeMap).filter((e) => e.collected).length
      if (collectedCount >= total) set.add(sticker.code)
    })
    return set
  }, [stickers, collection])

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
          isComplete={completedCodes.has(sticker.code)}
          isActive={selectedCode === sticker.code}
          onClick={() => onSelect(sticker.code)}
        />
      ))}
    </div>
  )
}

export default StickerList
