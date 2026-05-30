import { useState, useMemo, useRef, useCallback } from 'react'
import cards from '../data/cards.js'

export function useStickerSearch() {
  const [search, setSearch] = useState('')
  const [selectedCode, setSelectedCode] = useState(null)
  const [searchFocused, setSearchFocused] = useState(false)
  const searchInputRef = useRef(null)

  const stickersData = useMemo(() => {
    const teamsObj = cards.reduce((acc, card) => {
      const key = card.country_code ?? card.code
      if (!acc[key]) {
        acc[key] = {
          code: key,
          team_name: card.team_name,
          group: card.group,
          iso: card.iso,
          page: card.page,
          card_type: card.card_type,
          description: card.description,
          count: 0,
        }
      }
      acc[key].count++
      return acc
    }, {})

    return Object.values(teamsObj)
  }, [])

  const filteredStickers = useMemo(() => {
    if (!search.trim()) return stickersData
    const query = search.toUpperCase()
    return stickersData.filter(
      (s) =>
        s.code.includes(query) ||
        (s.team_name && s.team_name.toUpperCase().includes(query)) ||
        (s.description && s.description.toUpperCase().includes(query)) ||
        s.page.toString().includes(query)
    )
  }, [search, stickersData])

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
