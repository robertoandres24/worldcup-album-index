import { useEffect } from 'react'

export function useClickOutside(refs, onClickOutside, enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const handleClick = (e) => {
      const isOutside = refs.every(ref => ref.current && !ref.current.contains(e.target))
      if (isOutside) {
        onClickOutside()
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [refs, onClickOutside, enabled])
}
