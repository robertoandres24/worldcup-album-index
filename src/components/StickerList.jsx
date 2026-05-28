import { useMemo } from 'react'
import StickerCard from './StickerCard.jsx'

function StickerList({ stickers, onSelect, collection, selectedCode, t }) {
  const { completedCodes, statsMap } = useMemo(() => {
    const completed = new Set()
    const stats = {}
    stickers.forEach((sticker) => {
      const total = sticker.count ?? 20
      const codeMap = collection?.[sticker.code] ?? {}
      const entries = Object.values(codeMap)
      const collectedCount = entries.filter((e) => e.collected).length
      const repeatedCount = entries.reduce((acc, e) => acc + (e.repeated ?? 0), 0)
      if (collectedCount >= total) completed.add(sticker.code)
      stats[sticker.code] = { collected: collectedCount, total, repeated: repeatedCount }
    })
    return { completedCodes: completed, statsMap: stats }
  }, [stickers, collection])

  if (stickers.length === 0) {
    return (
      <div className="no-results">
        <div className="no-results-emoji">🤷‍♂️</div>
        <p>{t('noResults')}</p>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>{t('sureNotPasted')}</p>
      </div>
    )
  }

  return (
    <div className="stickers-list">
      {stickers.map((sticker) => (
        <StickerCard
          key={sticker.code}
          sticker={sticker}
          stats={statsMap[sticker.code]}
          isComplete={completedCodes.has(sticker.code)}
          isActive={selectedCode === sticker.code}
          onClick={() => onSelect(sticker.code)}
        />
      ))}
    </div>
  )
}

export default StickerList
