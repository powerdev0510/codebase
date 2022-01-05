import { useEffect, RefObject } from 'react'

type AnyEvent = MouseEvent | TouchEvent

export const useClickOutside = (
  refs: RefObject<HTMLElement>[],
  onClick: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (e: AnyEvent) => {
      // @ts-ignore
      if (refs.every((ref) => ref.current && !ref.current.contains(e.target))) {
        onClick()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClick, refs])
}
