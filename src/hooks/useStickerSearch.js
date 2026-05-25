import { useState, useMemo, useRef, useCallback } from 'react'
import stickersData from '../data/stickers.js'

export function useStickerSearch() {
  const [search, setSearch] = useState('')
  const [selectedCode, setSelectedCode] = useState(null)
  const [searchFocused, setSearchFocused] = useState(false)
  const searchInputRef = useRef(null)

  const filteredStickers = useMemo(() => {
    if (!search.trim()) return stickersData
    const query = search.toUpperCase()
    return stickersData.filter(
      (s) =>
        s.code.includes(query) ||
        (s.name && s.name.toUpperCase().includes(query)) ||
        s.page.toString().includes(query) ||
        (s.type && (s.code.includes(query) || (s.label && s.label.toUpperCase().includes(query))))
    )
  }, [search])

  const activeCountry = useMemo(() => {
    if (selectedCode) return stickersData.find((s) => s.code === selectedCode) ?? null
    if (!search.trim()) return null
    const query = search.trim().toUpperCase()
    const exact = stickersData.find((s) => s.code === query)
    return exact ?? (filteredStickers.length === 1 ? filteredStickers[0] : null)
  }, [selectedCode, search, filteredStickers])

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
