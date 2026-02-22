import React, { useState, useEffect } from 'react'
import { FiArrowUp } from 'react-icons/fi'
import styles from './ScrollToTopButton.module.scss'

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!isVisible) {
    return null
  }

  return (
    <button
      className={styles.scrollToTop}
      onClick={scrollToTop}
      aria-label="Наверх"
      title="Наверх"
    >
      <FiArrowUp />
    </button>
  )
}

export default ScrollToTopButton

