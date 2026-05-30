import { useState, useMemo, useRef, useCallback } from 'react'
import cards from '../data/cards.js'

export function useStickerSearch() {
  const [search, setSearch] = useState('')
  const [selectedCode, setSelectedCode] = useState(null)
  const [searchFocused, setSearchFocused] = useState(false)
  const searchInputRef = useRef(null)

  const { stickersData, cardByCode } = useMemo(() => {
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

    const cMap = new Map()
    for (const card of cards) {
      if (card.number != null) {
        cMap.set(`${card.country_code ?? card.code}-${card.number}`, card)
      }
    }

    return { stickersData: Object.values(teamsObj), cardByCode: cMap }
  }, [])

  const filteredStickers = useMemo(() => {
    if (!search.trim()) return stickersData.map((s) => ({ ...s, kind: 'team' }))
    const query = search.trim().toUpperCase()

    const matchedTeams = stickersData.filter(
      (s) =>
        s.code.includes(query) ||
        (s.team_name && s.team_name.toUpperCase().includes(query)) ||
        s.page.toString().includes(query)
    )

    const matchedCards = cards
      .filter((c) => {
        const descMatch = c.description.toUpperCase().includes(query)
        const notInTeamResults = !matchedTeams.some((t) => t.code === c.country_code)
        return descMatch && notInTeamResults
      })
      .map((c) => ({
        kind: 'card',
        code: c.code,
        country_code: c.country_code,
        number: c.number,
        description: c.description,
        page: c.page,
        group: c.group,
        iso: c.iso,
        card_type: c.card_type,
      }))

    return [...matchedTeams.map((t) => ({ ...t, kind: 'team' })), ...matchedCards]
  }, [search, stickersData])

  const activeCountry = useMemo(() => {
    // Auto-open panel on exact card code (e.g. "ARG 17")
    if (search.trim()) {
      const query = search.trim().toUpperCase()
      const queryNoSpaces = query.replace(/\s+/g, '')
      const codeMatch = queryNoSpaces.match(/^([A-Z0-9]+?)(\d+)$/)
      if (codeMatch) {
        const [, prefix, numStr] = codeMatch
        const num = parseInt(numStr, 10)
        const card = cardByCode.get(`${prefix}-${num}`)
        if (card) {
          const item = stickersData.find((s) => s.code === card.country_code)
          return item ? { ...item, kind: 'team' } : null
        }
      }
    }
    // Persist panel from explicit click
    if (selectedCode) {
      const item = stickersData.find((s) => s.code === selectedCode)
      return item ? { ...item, kind: 'team' } : null
    }
    return null
  }, [search, selectedCode, cardByCode, stickersData])

  const matchedNumber = useMemo(() => {
    if (!activeCountry || !search.trim()) return null
    const query = search.trim().toUpperCase()
    const queryNoSpaces = query.replace(/\s+/g, '')
    const codeMatch = queryNoSpaces.match(/^([A-Z0-9]+?)(\d+)$/)
    if (codeMatch) {
      const [, prefix, numStr] = codeMatch
      const num = parseInt(numStr, 10)
      if (prefix === activeCountry.code) {
        const card = cardByCode.get(`${prefix}-${num}`)
        if (card) return num
      }
    }
    return null
  }, [search, activeCountry, cardByCode])

  const matchedCard = useMemo(() => {
    if (!activeCountry || !search.trim()) return null
    const query = search.trim().toUpperCase()
    const queryNoSpaces = query.replace(/\s+/g, '')
    const codeMatch = queryNoSpaces.match(/^([A-Z0-9]+?)(\d+)$/)
    if (codeMatch) {
      const [, prefix, numStr] = codeMatch
      const num = parseInt(numStr, 10)
      if (prefix === activeCountry.code) {
        return cardByCode.get(`${prefix}-${num}`) ?? null
      }
    }
    return null
  }, [search, activeCountry, cardByCode])

  const clearSearch = useCallback(() => {
    setSelectedCode(null)
    setSearch('')
  }, [])

  const selectCountry = useCallback((code) => {
    setSelectedCode(code)
    setSearch(code)
  }, [])

  const selectCard = useCallback((card) => {
    setSelectedCode(card.country_code)
    setSearch(card.code)
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
    selectCard,
    clearSearch,
    searchFocused,
    setSearchFocused,
    searchInputRef,
    filteredStickers,
    activeCountry,
    matchedNumber,
    matchedCard,
  }
}
