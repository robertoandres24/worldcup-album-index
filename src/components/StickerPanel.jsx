import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient.js'

const STICKER_COUNT = 20

function StickerPanel({ countryCode, user }) {
  const [collected, setCollected] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user || !countryCode) return

    setLoading(true)
    supabase
      .from('sticker_collection')
      .select('sticker_number, collected')
      .eq('user_id', user.id)
      .eq('country_code', countryCode)
      .then(({ data, error }) => {
        if (error) {
          console.error('Error loading stickers:', error)
          setLoading(false)
          return
        }
        const map = {}
        if (data) {
          data.forEach((row) => {
            map[row.sticker_number] = row.collected
          })
        }
        setCollected(map)
        setLoading(false)
      })
  }, [user, countryCode])

  const toggleSticker = async (number) => {
    const current = !!collected[number]
    const next = !current

    setCollected((prev) => ({ ...prev, [number]: next }))

    const { error } = await supabase.from('sticker_collection').upsert(
      {
        user_id: user.id,
        country_code: countryCode,
        sticker_number: number,
        collected: next,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,country_code,sticker_number' }
    )

    if (error) {
      console.error('Error saving sticker:', error)
      setCollected((prev) => ({ ...prev, [number]: current }))
    }
  }

  if (!user) return null

  const collectedCount = Object.values(collected).filter(Boolean).length

  return (
    <div className="sticker-panel">
      <div className="sticker-panel-header">
        <span className="sticker-panel-title">
          🗂️ Figuritas <strong>{countryCode}</strong>
        </span>
        <span className="sticker-panel-count">
          {loading ? '...' : `${collectedCount} / ${STICKER_COUNT}`}
        </span>
      </div>
      <div className="sticker-grid">
        {Array.from({ length: STICKER_COUNT }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            className={`figurita-card ${collected[num] ? 'collected' : ''}`}
            onClick={() => toggleSticker(num)}
            disabled={loading}
            aria-label={`Figurita ${countryCode} ${num}`}
          >
            <span className="figurita-number">{num}</span>
            <span className="figurita-code">{countryCode}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default StickerPanel
