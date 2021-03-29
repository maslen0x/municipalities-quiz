import { useState, useEffect, useCallback } from 'react'

const usePopup = () => {
  const [isPopupVisible, setPopupVisible] = useState(false)

  const closePopupByClick = useCallback(e => e.target.classList.contains('popup') && onClosePopup(), [])
  const closePopupByKeydown = useCallback(e => e.key === 'Escape' && onClosePopup(), [])

  const onOpenPopup = () => setPopupVisible(true)
  const onClosePopup = () => setPopupVisible(false)

  useEffect(() => {
    document.addEventListener('click', closePopupByClick)
    document.addEventListener('keydown', closePopupByKeydown)
    return () => {
      document.removeEventListener('click', closePopupByClick)
      document.removeEventListener('keydown', closePopupByKeydown)
    }
  }, [closePopupByClick, closePopupByKeydown])

  useEffect(() => {
    isPopupVisible
      ? document.documentElement.style.overflow = 'hidden'
      : document.documentElement.style.overflow = ''
  }, [isPopupVisible])

  return {
    isPopupVisible,
    onOpenPopup,
    onClosePopup
  }
}

export default usePopup