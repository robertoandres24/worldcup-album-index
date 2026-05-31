import { useMemo } from 'react'
import TeamCard from './TeamCard.jsx'
import StickerCard from './StickerCard.jsx'

function StickerList({ results, onSelect, collection, selectedCode, t }) {
  const { completedCodes, statsMap } = useMemo(() => {
    const completed = new Set()
    const stats = {}
    results.forEach((result) => {
      const total = result.count ?? 20
      const codeMap = collection?.[result.code] ?? {}
      const entries = Object.values(codeMap)
      const collectedCount = entries.filter((e) => e.collected).length
      const repeatedCount = entries.reduce((acc, e) => acc + (e.repeated ?? 0), 0)
      if (collectedCount >= total) completed.add(result.code)
      stats[result.code] = { collected: collectedCount, total, repeated: repeatedCount }
    })
    return { completedCodes: completed, statsMap: stats }
  }, [results, collection])

  if (results.length === 0) {
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
      {results.map((result) =>
        result.kind === 'teamCard' ? (
          <TeamCard
            key={result.code}
            team={result}
            stats={statsMap[result.code]}
            isComplete={completedCodes.has(result.code)}
            isActive={selectedCode === result.code}
            onClick={() => onSelect(result)}
          />
        ) : (
          <StickerCard
            key={result.code}
            sticker={result}
            collection={collection}
            onClick={() => onSelect(result)}
          />
        )
      )}
    </div>
  )
}

export default StickerList
