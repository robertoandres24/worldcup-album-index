import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabaseClient.js'

const LONG_PRESS_MS = 500

function StickerPanel({ countryCode, user, stickerCount = 20, onCollectionChange, t }) {
  const [collected, setCollected] = useState({})
  const [repeated, setRepeated] = useState({})
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [modalRepeated, setModalRepeated] = useState(0)
  const longPressTimer = useRef(null)

  useEffect(() => {
    if (!user || !countryCode) return

    setLoading(true)
    supabase
      .from('sticker_collection')
      .select('sticker_number, repeated')
      .eq('user_id', user.id)
      .eq('country_code', countryCode)
      .then(({ data, error }) => {
        if (error) {
          console.error('Error loading stickers:', error)
          setLoading(false)
          return
        }
        const cMap = {}
        const rMap = {}
        if (data) {
          data.forEach((row) => {
            cMap[row.sticker_number] = true
            rMap[row.sticker_number] = row.repeated ?? 0
          })
        }
        setCollected(cMap)
        setRepeated(rMap)
        setLoading(false)
      })
  }, [user, countryCode])

  const toggleSticker = (number) => {
    if (repeated[number] > 0) {
      openModal(number)
      return
    }

    doToggleSticker(number)
  }

  const doToggleSticker = async (number) => {
    const current = !!collected[number]
    const next = !current

    setCollected((prev) => ({ ...prev, [number]: next }))
    if (!next) setRepeated((prev) => ({ ...prev, [number]: 0 }))
    onCollectionChange?.(countryCode, number, { collected: next, repeated: next ? 0 : 0 })

    let error
    if (next) {
      ;({ error } = await supabase.from('sticker_collection').insert({
        user_id: user.id,
        country_code: countryCode,
        sticker_number: number,
        repeated: 0,
        updated_at: new Date().toISOString(),
      }))
    } else {
      ;({ error } = await supabase
        .from('sticker_collection')
        .delete()
        .eq('user_id', user.id)
        .eq('country_code', countryCode)
        .eq('sticker_number', number))
    }

    if (error) {
      console.error('Error saving sticker:', error)
      setCollected((prev) => ({ ...prev, [number]: current }))
      onCollectionChange?.(countryCode, number, { collected: current, repeated: repeated[number] ?? 0 })
    }
  }

  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [])

  const openModal = (number) => {
    if (loading) return
    const current = repeated[number] ?? 0
    setModalRepeated(current > 0 ? current : 1)
    setModal(number)
  }

  const closeModal = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
    setModal(null)
  }

  const applyModalAction = async (action) => {
    const number = modal
    const rep = modalRepeated
    closeModal()

    if (action === 'none') {
      setCollected((prev) => ({ ...prev, [number]: false }))
      setRepeated((prev) => ({ ...prev, [number]: 0 }))
      onCollectionChange?.(countryCode, number, { collected: false, repeated: 0 })
      await supabase
        .from('sticker_collection')
        .delete()
        .eq('user_id', user.id)
        .eq('country_code', countryCode)
        .eq('sticker_number', number)
      return
    }

    setCollected((prev) => ({ ...prev, [number]: true }))
    setRepeated((prev) => ({ ...prev, [number]: rep }))
    onCollectionChange?.(countryCode, number, { collected: true, repeated: rep })

    const existing = collected[number]
    if (existing) {
      await supabase
        .from('sticker_collection')
        .update({ repeated: rep, updated_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .eq('country_code', countryCode)
        .eq('sticker_number', number)
    } else {
      await supabase.from('sticker_collection').insert({
        user_id: user.id,
        country_code: countryCode,
        sticker_number: number,
        repeated: rep,
        updated_at: new Date().toISOString(),
      })
    }
  }

  const handleLongPressStart = (e, number) => {
    longPressTimer.current = setTimeout(() => {
      openModal(number)
    }, LONG_PRESS_MS)
  }

  const handleTouchStart = (e, number) => {
    e.preventDefault()
    handleLongPressStart(e, number)
  }

  const handleLongPressEnd = () => {
    clearTimeout(longPressTimer.current)
    longPressTimer.current = null
  }

  const handleContextMenu = (e, number) => {
    e.preventDefault()
    openModal(number)
  }

  if (!user) return null

  const collectedCount = Object.values(collected).filter(Boolean).length
  const repeatedCount = Object.values(repeated).reduce((acc, v) => acc + (v || 0), 0)

  return (
    <div className="sticker-panel">
      <div className="sticker-panel-header">
        <span className="sticker-panel-title">
          {t('stickerPanelTitle')} <strong>{countryCode}</strong>
        </span>
        <span className="sticker-panel-count">
          {loading ? '...' : `${collectedCount} / ${stickerCount}${repeatedCount > 0 ? ` · 🔄 ${repeatedCount}` : ''}`}
        </span>
      </div>
      <div className="sticker-grid">
        {Array.from({ length: stickerCount }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            className={`figurita-card ${collected[num] ? 'collected' : ''} ${repeated[num] > 0 ? 'repeated' : ''}`}
            onClick={() => toggleSticker(num)}
            onContextMenu={(e) => handleContextMenu(e, num)}
            onTouchStart={(e) => handleTouchStart(e, num)}
            onTouchEnd={handleLongPressEnd}
            onTouchMove={handleLongPressEnd}
            disabled={loading}
            aria-label={`Figurita ${countryCode} ${num}`}
          >
            <span className="figurita-number">{num}</span>
            <span className="figurita-code">{countryCode}</span>
            {repeated[num] > 0 && (
              <span className="figurita-repeated-badge">+{repeated[num]}</span>
            )}
          </button>
        ))}
      </div>
      <p className="sticker-grid-hint">
        {window.matchMedia('(pointer: fine)').matches ? t('hintMouse') : t('hintTouch')}
      </p>

      {modal !== null && (
        <div className="sticker-modal-overlay" onClick={closeModal}>
          <div className="sticker-modal" onClick={(e) => e.stopPropagation()}>
            <p className="sticker-modal-title">
              {t('modalTitle')} <strong>{countryCode} #{modal}</strong>
            </p>
            <div className="sticker-modal-repeated-row">
              <span className="sticker-modal-repeated-label">{t('modalRepeatedLabel')}</span>
              <div className="sticker-modal-counter">
                <button
                  className="sticker-counter-btn"
                  onClick={() => setModalRepeated((v) => Math.max(0, v - 1))}
                  aria-label={t('ariaLess')}
                >−</button>
                <span className="sticker-counter-value">{modalRepeated}</span>
                <button
                  className="sticker-counter-btn"
                  onClick={() => setModalRepeated((v) => v + 1)}
                  aria-label={t('ariaMore')}
                >+</button>
              </div>
            </div>
            {modalRepeated === 0 && (
              <p className="sticker-modal-hint">{t('modalHintRemove')}</p>
            )}
            <div className="sticker-modal-actions">
              <button className="sticker-modal-btn btn-collected" onClick={() => applyModalAction('collected')}>
                {modalRepeated === 0 ? t('modalBtnCollectedZero') : t('modalBtnCollectedRep').replace('{count}', modalRepeated)}
              </button>
              <button className="sticker-modal-btn btn-none" onClick={() => applyModalAction('none')}>
                {t('modalBtnNone')}
              </button>
            </div>
            <button className="sticker-modal-cancel" onClick={closeModal}>{t('modalCancel')}</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default StickerPanel
