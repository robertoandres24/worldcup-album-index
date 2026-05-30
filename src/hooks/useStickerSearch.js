import { useState, useMemo, useRef, useCallback } from 'react'
import cards from '../data/cards.js'

export function useStickerSearch() {
  const [search, setSearch] = useState('')
  const [selectedCode, setSelectedCode] = useState(null)
  const [searchFocused, setSearchFocused] = useState(false)
  const searchInputRef = useRef(null)

  const { stickersData, cardCodesByTeam } = useMemo(() => {
    const map = new Map()
    const codesMap = new Map()
    for (const card of cards) {
      const key = card.country_code ?? card.code
      if (!map.has(key)) {
        map.set(key, {
          code: key,
          name: card.team_name,
          group: card.group,
          iso: card.iso,
          page: card.page,
          card_type: card.card_type,
          count: 0,
        })
        codesMap.set(key, new Set())
      }
      map.get(key).count++
      codesMap.get(key).add(card.code)
    }

    const teams = Array.from(map.values()).map((item) => {
      if (item.card_type === 'panini_logo') {
        return {
          code: item.code,
          label: '00 PANINI',
          type: 'panini',
          count: item.count,
          page: item.page,
        }
      }
      if (item.card_type === 'fwc_special') {
        return { code: item.code, label: 'FWC', type: 'fwc', count: item.count, page: item.page }
      }
      if (item.card_type === 'cc') {
        return { code: item.code, label: 'CC', type: 'cc', count: item.count, page: item.page }
      }
      return { code: item.code, name: item.name, group: item.group, iso: item.iso, page: item.page }
    })

    return { stickersData: teams, cardCodesByTeam: codesMap }
  }, [])

  const filteredStickers = useMemo(() => {
    if (!search.trim()) return stickersData
    const query = search.toUpperCase()
    return stickersData.filter((s) => {
      if (s.code.includes(query)) return true
      if (s.name && s.name.toUpperCase().includes(query)) return true
      if (s.label && s.label.toUpperCase().includes(query)) return true
      if (s.page.toString().includes(query)) return true
      const cardCodes = cardCodesByTeam.get(s.code)
      if (cardCodes) {
        for (const code of cardCodes) {
          if (code.toUpperCase().includes(query)) return true
        }
      }
      return false
    })
  }, [search, stickersData, cardCodesByTeam])

  const activeCountry = useMemo(() => {
    if (selectedCode) return stickersData.find((s) => s.code === selectedCode) ?? null
    if (!search.trim()) return null
    const query = search.trim().toUpperCase()
    const exact = stickersData.find((s) => s.code === query)
    return exact ?? (filteredStickers.length === 1 ? filteredStickers[0] : null)
  }, [selectedCode, search, filteredStickers, stickersData])

  const clearSearch = useCallback(() => {
    setSelectedCode(null)
    setSearch('')
  }, [])

  const selectCountry = useCallback((code) => {
    setSelectedCode(code)
    setSearch(code)
  }, [])

  const handleSearchChange = useCallback((value) => {
    setSelectedCode(null)
    setSearch(value)
  }, [])

  return {
    search,
    setSearch: handleSearchChange,
    selectedCode,
    selectCountry,
    clearSearch,
    searchFocused,
    setSearchFocused,
    searchInputRef,
    filteredStickers,
    activeCountry,
  }
}
